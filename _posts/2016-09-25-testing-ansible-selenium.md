---
title: Testing Ansible Web App Roles with Selenium
date: 2016-09-25 00:00:00 -04:00
header:
  teaser: images/resized/2016-09-25-testing-ansible-selenium/480/bunny-film-error.png
tags:
- ansible
- clipbucket
- docker
excerpt: A way to perform strong tests on Ansible web app roles
---

{% include base_path %}

# Overview

Ansible is an excellent tool for deploying web apps. Ansible allows us to define web apps in terms of the different "roles" that compose our web app (e.g. web server, database server, application server). As our roles and the interactions between them become more complex, we need appropriately stronger ways of testing our roles to verify we're deploying our web app correctly.

In [our last post](/ansible-role-clipbucket/), we used Ansible to deploy a web app called [ClipBucket](http://www.clipbucket.com/), a video-hosting web app. In that post, we included automated tests to verify that the web app installed correctly, but these tests did not exercise application functionality very rigorously.

In this post, we'll demonstrate stronger automated tests that exercise the app's functionality more deeply. To help with this, we'll be using a web browser automation tool called Selenium. We'll continue using the ClipBucket role here, but the ideas should apply generally to any web app we deploy with Ansible.

# Basic Testing with `curl`

In our original [build script](https://github.com/mtlynch/ansible-role-clipbucket/blob/8d0bbdce24d09ab2027aa3a5a29ef377fcde34a4/build#L64...L67), our final test looked like this:

```bash
curl -s "${container_ip}"  \
  | grep "Login" && \
  (echo 'Landing page test: pass' && exit 0) || \
  (echo 'Landing page test: fail' && exit 1)
```

This is a useful test, as it verifies a few important properties of our web app, namely:

* Web server is listening on port 80
* Web server is responding to user requests
* Web server is serving the ClipBucket landing page

# Why We Need Better Tests

Though the original tests gave us some important checks, they exercises very little of the web app's actual functionality. It's possible to introduce bugs into our Ansible role that would break our web app, but go undetected by our basic test.

Imagine for example that we accidentally delete a critical task in our Clipbucket playbook:

```diff
diff --git a/tasks/main.yml b/tasks/main.yml
index 8542ffc..e9d42c0 100644
--- a/tasks/main.yml
+++ b/tasks/main.yml
@@ -29,15 +29,6 @@
     name: flvtool2
     state: present

-- name: create a symlink for ClipBucket to find ffmpeg and MP4Box
-  file:
-    path: "/usr/local/bin/{{ item }}"
-    src: "/usr/bin/{{ item }}"
-    state: link
-  with_items:
-    - ffmpeg
-    - MP4Box
-
 - name: install the Python MySQLB module
   pip: name=MySQL-python
```

If we deploy using this modified playbook, then browse to the target server, everything appears to be normal:

{% include image.html file="clipbucket-no-error.png" alt="ClipBucket no error" img_link="true" %}

All installation tasks succeed and we see the ClipBucket landing page. What's the problem?

Let's try uploading a video. Everything works until we try to view it:

{% include image.html file="bunny-film-error.png" alt="Video error screenshot" img_link="true" %}

Because we deleted the task in our playbook that creates a symlink to ffmpeg, ClipBucket fails to transcode videos into a streamable format.

We'd like to create an automated test for this, but uploading a video is difficult to script with simple command-line tools. The user first has to log in (which means that the script needs to manage cookies across requests), then they have to navigate the web UI to upload a video. This would be very difficult to do in a series of `curl` commands.

Fortunately, we can use [Selenium](http://docs.seleniumhq.org/). Selenium is a web testing tool that allows us to perform web browser actions programmatically.

# Setting Up Selenium

We'll need to install a few components on our Ansible control machine to get started with Selenium:

* [**Selenium Python Package**](https://pypi.python.org/pypi/selenium) - We'll be using the Python API, and this package gets us the Selenium framework and Python bindings.
* **Firefox** - We need a browser for Selenium to drive. While Selenium works with most major browsers, it supports Firefox natively.
* **xvfb** - Because we'll be running this test on a VM without a real display, we'll use xvfb as a virtual display, so that Firefox thinks it's running on a monitor.

We can create a fairly [simple playbook](https://github.com/mtlynch/ansible-role-clipbucket/blob/master/tests/install_selenium.yml) for this. The only part that was a bit difficult was that xvfb requires an init script that's non-obvious. Fortunately, blogger Cory Klein wrote [a post](http://coryklein.com/ansible/2015/10/09/using-ansible-to-install-google-chrome.html) last year that gives an example of an xvfb init script and using his example, we are able to [create one](https://github.com/mtlynch/ansible-role-clipbucket/blob/master/tests/templates/xvfb-init.d.j2) for our needs.

# Choosing a Web Flow to Test

Now that we have Selenium installed, it's time to create a Selenium script to exercise our web app. There are many possibilities for web flows we might like to verify, such as:

* Logging in
* Uploading a video and playing it back
* Making a comment on a video and checking that it displays
* Creating a new user account

For ClipBucket, I'm particularly interested in making sure videos upload correctly, so we'll need to test login and video upload. Unfortunately, ClipBucket uses a pretty heavyweight JavaScript pakage for managing uploads, so the normal Selenium APIs for uploading files don't work.

As an alternative, we'll use the ClipBucket modules diagnostic page. It displays ClipBucket's installed modules and displays an error message when any of the modules are not installed properly:

{% include image.html file="clipbucket-module-view.png" alt="ClipBucket modules view" img_link="true" %}

We can use this page in lieu of a video upload flow to verify that all modules are installed properly.

Now that we know what functionality we want to exercise, we can sketch out the web flow we want to automate. It will look something like this:

1. Load ClipBucket URL
1. Log in as an administrator
1. Go to the module diagnostics page
1. Verify that all modules are installed

This will give us automated verification of some additional functionality that we were not exercising in our basic tests:

* User login is working (which means that ClipBucket can successfully access the database)
* ClipBucket can access its tool dependencies

# Automating Web Flow

To automate browser actions in Selenium, we need to tell Selenium which URL to load in the browser, then we need to show Selenium how to find and interact with elements on the page. Let's take a look at how we'll automate the actions we need for our desired web flow.

## Automating Login

To log in, we need to find the credential fields on the login page, enter our username and password, then push the "Login" button. Fortunately, the username and password fields have an `id` attribute, making it very easy to identify them on the page. The "Login" button does not have an `id` attribute, but it does have a `name` attribute of `login` which is unique on the page, allowing us to use that as a unique identifier:

{% include image.html file="clipbucket-login-fields.png" alt="ClipBucket login fields" img_link="true" %}

We locate these fields and enter the login credentials in the following [code snippet](https://github.com/mtlynch/ansible-role-clipbucket/blob/3afec13b7b68eb38d4ffe930f73116278fdcf455/tests/clipbucket_driver/clipbucket_driver.py#L40...L53):

```python
self.get('/admin_area/login.php')

username_element = self._driver.find_element_by_id('username')
ui.WebDriverWait(
    self._driver, TIMEOUT).until(
    expected_conditions.visibility_of(username_element))
password_element = self._driver.find_element_by_id('password')

username_element.send_keys(username)
password_element.send_keys(password)
self._driver.find_element_by_name('login').click()
```

## Screen Scraping Module List

Checking the installed modules page is a bit different. We don't need to interact with the page at all; we just need to find and interpret some page elements. We want to make sure that all of the modules are installed correctly, which means we need to identify the boxes that identify each module, then programmatically determine whether they display an error message.

This is tricky because none of the elements we're interested in (or their parent elements in the DOM) have `id` attributes. They are all `<div>`s with `class="well"`, so that's the best option we have for finding each of the module information boxes.

After we find the boxes, we need to determine whether the box indicates a successful module install or a problem. We can do this by either looking for indicators of success or verifying that the elements lack indicators of failure. The former is a bit more rigorous, but the latter is simpler to code. Boxes with error messages always contain an element with `class="alert"` attribute, so we can identify successful boxes if they do not have any child elements with this class.

{% include image.html file="clipbucket-module-error.png" alt="ClipBucket module error" img_link="true" %}

We can do this with the following [code snippet](https://github.com/mtlynch/ansible-role-clipbucket/blob/3afec13b7b68eb38d4ffe930f73116278fdcf455/tests/clipbucket_driver/clipbucket_driver.py#L55...L71).

```python
self.get('/admin_area/cb_mod_check.php')

for module_element in self._driver.find_elements_by_class_name('well'):
    try:
        ui.WebDriverWait(
                self._driver, TIMEOUT).until(
                expected_conditions.visibility_of(module_element))
        alert_element = module_element.find_element_by_class_name(
            'alert')
        if alert_element:
            raise ClipBucketModuleError(alert_element.text)
    except exceptions.NoSuchElementException:
        # Lack of alert is good: the module is installed correctly.
        continue
```

# Integrating Web Flow Test in Travis

Putting it all together, we can add the Selenium installation playbook and our Selenium script to our [build file](https://github.com/mtlynch/ansible-role-clipbucket/blob/88a397b790e6d135719339964bcddd7f5acf0359/build#L69...L78).

Now, we create [a Github pull request](https://github.com/mtlynch/ansible-role-clipbucket/pull/34) with the broken commit we made earlier. When the Travis build runs, we can see that it fails:

```text
2016-09-21 00:17:06,229 clipbucket_driver INFO     Logging in with username=testadmin
2016-09-21 00:17:06,229 clipbucket_driver INFO     Loading url: http://172.17.0.2/admin_area/login.php
2016-09-21 00:17:07,525 clipbucket_driver INFO     Login complete
2016-09-21 00:17:07,526 clipbucket_driver INFO     Checking ClipBucket modules
2016-09-21 00:17:07,526 clipbucket_driver INFO     Loading url: http://172.17.0.2/admin_area/cb_mod_check.php
Traceback (most recent call last):
  File "tests/clipbucket_driver/main.py", line 36, in <module>
    main(parser.parse_args())
  File "tests/clipbucket_driver/main.py", line 24, in main
    driver.do_check_modules()
  File "/home/travis/build/mtlynch/ansible-role-clipbucket/tests/clipbucket_driver/clipbucket_driver.py", line 64, in do_check_modules
    raise ClipBucketModuleError(alert_element.text)
clipbucket_driver.ClipBucketModuleError: ffmpeg is not found
```

Excellent! Our new test is correctly identifying the break in our Ansible role.

And let's make sure everything works when we run our normal playbook:

```text
2016-09-21 01:58:21,992 clipbucket_driver INFO     Logging in with username=testadmin
2016-09-21 01:58:21,992 clipbucket_driver INFO     Loading url: http://172.17.0.2/admin_area/login.php
2016-09-21 01:58:23,036 clipbucket_driver INFO     Login complete
2016-09-21 01:58:23,039 clipbucket_driver INFO     Checking ClipBucket modules
2016-09-21 01:58:23,040 clipbucket_driver INFO     Loading url: http://172.17.0.2/admin_area/cb_mod_check.php
2016-09-21 01:58:23,724 clipbucket_driver INFO     Module check complete
2016-09-21 01:58:23,724 clipbucket_driver INFO     Exiting ClipBucket driver
```

The Selenium script correctly determines that all required modules are installed correctly. If we ever make a change in the future that causes login functionality to fail or modules to install incorrectly, our automated tests will catch it.

# Conclusion

In this post, we combined Ansible with Selenium to verify that an Ansible role deployed a web app correctly and that the resulting deployment supported expected user behavior. Selenium offers a great deal of flexibility, so it's possible to test many different web UI flows in a variety of web applications.
