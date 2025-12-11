-- Standard awesome library
local gears = require("gears")
local awful = require("awful")
require("awful.autofocus")
local wibox = require("wibox")
local beautiful = require("beautiful")
local naughty = require("naughty")
local menubar = require("menubar")
local hotkeys_popup = require("awful.hotkeys_popup")
require("awful.hotkeys_popup.keys")

-- Load custom layouts
local singlerow = require("singlerow")
local singlerow_flex = require("singlerow_flex")

-- Error handling
if awesome.startup_errors then
    naughty.notify({ preset = naughty.config.presets.critical,
                     title = "Oops, there were errors during startup!",
                     text = awesome.startup_errors })
end

do
    local in_error = false
    awesome.connect_signal("debug::error", function (err)
        if in_error then return end
        in_error = true
        naughty.notify({ preset = naughty.config.presets.critical,
                         title = "Oops, an error happened!",
                         text = tostring(err) })
        in_error = false
    end)
end

-- Variable definitions
beautiful.init(gears.filesystem.get_themes_dir() .. "default/theme.lua")

-- Custom theme overrides for better focus visibility
beautiful.border_width = 5
beautiful.border_normal = "#404040"  -- Dark gray for unfocused windows
beautiful.border_focus = "#0099ff"   -- Bright blue for focused windows

-- Set terminal to ghostty
terminal = "ghostty"
editor = os.getenv("EDITOR") or "nano"
editor_cmd = terminal .. " -e " .. editor
modkey = "Mod4"

-- Table of layouts
awful.layout.layouts = {
    --singlerow,
    singlerow_flex,
    awful.layout.suit.floating,
    --awful.layout.suit.tile,
    --awful.layout.suit.tile.left,
    --awful.layout.suit.tile.bottom,
    --awful.layout.suit.tile.top,
    --awful.layout.suit.fair,
    --awful.layout.suit.fair.horizontal,
    --awful.layout.suit.spiral,
    --awful.layout.suit.spiral.dwindle,
    --awful.layout.suit.max,
    --awful.layout.suit.max.fullscreen,
    --awful.layout.suit.magnifier,
    --awful.layout.suit.corner.nw,
}

-- Menu
myawesomemenu = {
   { "restart", awesome.restart },
   { "quit", function() awesome.quit() end },
}

mymainmenu = awful.menu({ items = { { "awesome", myawesomemenu, beautiful.awesome_icon },
                                    { "open terminal", terminal }
                                  }
                        })

mylauncher = awful.widget.launcher({ image = beautiful.awesome_icon,
                                     menu = mymainmenu })

menubar.utils.terminal = terminal

-- Wibar
mytextclock = wibox.widget.textclock(" %a %b %d, %I:%M %p ")

-- Create a wibox for each screen and add it
local taglist_buttons = gears.table.join(
                    awful.button({ }, 1, function(t) t:view_only() end),
                    awful.button({ modkey }, 1, function(t)
                                              if client.focus then
                                                  client.focus:move_to_tag(t)
                                              end
                                          end),
                    awful.button({ }, 3, awful.tag.viewtoggle),
                    awful.button({ modkey }, 3, function(t)
                                              if client.focus then
                                                  client.focus:toggle_tag(t)
                                              end
                                          end),
                    awful.button({ }, 4, function(t) awful.tag.viewnext(t.screen) end),
                    awful.button({ }, 5, function(t) awful.tag.viewprev(t.screen) end)
                )

local tasklist_buttons = gears.table.join(
                     awful.button({ }, 1, function (c)
                                              if c == client.focus then
                                                  c.minimized = true
                                              else
                                                  c:emit_signal(
                                                      "request::activate",
                                                      "tasklist",
                                                      {raise = true}
                                                  )
                                              end
                                          end),
                     awful.button({ }, 3, function()
                                              awful.menu.client_list({ theme = { width = 250 } })
                                          end),
                     awful.button({ }, 4, function ()
                                              awful.client.focus.byidx(1)
                                          end),
                     awful.button({ }, 5, function ()
                                              awful.client.focus.byidx(-1)
                                          end))

awful.screen.connect_for_each_screen(function(s)
    -- Define tag configurations with explicit name-layout mappings
    local default_layout = singlerow_flex
    local tag_configs = {
        { name = "Tasks" },
        { name = "NixOS" },
        { name = "Email" },
        { name = "Blog",  layout = singlerow_flex },
        { name = "Book",  layout = singlerow_flex },
        { name = "Web" },
        { name = "6" },
        { name = "7" },
        { name = "8" },
        { name = "Perf" },
    }

    -- Create tags with default or specified layout
    for _, config in ipairs(tag_configs) do
        awful.tag.add(config.name, {
            screen = s,
            layout = config.layout or default_layout
        })
    end

    -- Create a promptbox for each screen
    s.mypromptbox = awful.widget.prompt()
    -- Create an imagebox widget which will contain an icon indicating which layout we're using.
    s.mylayoutbox = awful.widget.layoutbox(s)
    s.mylayoutbox:buttons(gears.table.join(
                           awful.button({ }, 1, function () awful.layout.inc( 1) end),
                           awful.button({ }, 3, function () awful.layout.inc(-1) end),
                           awful.button({ }, 4, function () awful.layout.inc( 1) end),
                           awful.button({ }, 5, function () awful.layout.inc(-1) end)))
    -- Create a taglist widget
    s.mytaglist = awful.widget.taglist {
        screen  = s,
        filter  = awful.widget.taglist.filter.all,
        buttons = taglist_buttons
    }

    -- Create a tasklist widget
    s.mytasklist = awful.widget.tasklist {
        screen  = s,
        filter  = awful.widget.tasklist.filter.currenttags,
        buttons = tasklist_buttons
    }

    -- Create the wibox
    s.mywibox = awful.wibar({ position = "top", screen = s })

    -- Add widgets to the wibox
    s.mywibox:setup {
        layout = wibox.layout.align.horizontal,
        { -- Left widgets
            layout = wibox.layout.fixed.horizontal,
            mylauncher,
            s.mytaglist,
            s.mypromptbox,
        },
        s.mytasklist, -- Middle widget
        { -- Right widgets
            layout = wibox.layout.fixed.horizontal,
            wibox.widget.systray(),
            mytextclock,
            s.mylayoutbox,
        },
    }
end)

-- Key bindings
globalkeys = gears.table.join(
    awful.key({ modkey,           }, "s", hotkeys_popup.show_help,
              {description = "show help", group = "awesome"}),
    awful.key({ modkey,           }, "t", function () awful.spawn(terminal) end,
              {description = "open a terminal", group = "launcher"}),
    awful.key({ modkey, "Shift" }, "r", awesome.restart,
              {description = "reload awesome", group = "awesome"}),
    awful.key({ modkey, "Shift"   }, "q", awesome.quit,
              {description = "quit awesome", group = "awesome"}),
    --awful.key({ modkey,           }, "r",     function () awful.screen.focused().mypromptbox:run() end,
    --          {description = "run prompt", group = "launcher"}),
    awful.key({ modkey }, "r", function() awful.spawn("rofi -show drun") end,
              {description = "show rofi", group = "launcher"}),
    awful.key({ modkey }, "c", function() awful.spawn("code") end,
              {description = "run VS Code", group = "launcher"}),
    awful.key({ modkey }, "f", function() awful.spawn("firefox") end,
              {description = "run firefox", group = "launcher"}),
    awful.key({ modkey }, "e", function() awful.spawn("pcmanfm") end,
              {description = "run PCMan File Manager", group = "launcher"}),
    awful.key({ modkey, }, "l", function() awful.spawn("light-locker-command --lock") end,
              {description = "lock screen", group = "awesome"}),
    awful.key({ modkey,           }, "Delete",
        function ()
            awful.client.focus.byidx(-1)
        end,
        {description = "focus previous by index", group = "client"}
    ),
    awful.key({ modkey,           }, "BackSpace",
        function ()
            awful.client.focus.byidx( 1)
        end,
        {description = "focus next by index", group = "client"}
    ),
    awful.key({ modkey, "Shift"   }, "Delete", function () awful.client.swap.byidx( -1)    end,
              {description = "swap with previous client by index", group = "client"}),
    awful.key({ modkey, "Shift"   }, "BackSpace", function () awful.client.swap.byidx(  1)    end,
              {description = "swap with next client by index", group = "client"}),
    --awful.key({ modkey,           }, "l",     function () awful.tag.incmwfact( 0.05)          end,
    --          {description = "increase master width factor", group = "layout"}),
    --awful.key({ modkey,           }, "h",     function () awful.tag.incmwfact(-0.05)          end,
    --          {description = "decrease master width factor", group = "layout"}),
    awful.key({ modkey, "Shift"   }, "l",     function () singlerow_flex.incfactor(0.1)       end,
              {description = "increase focused client width (singlerow_flex)", group = "layout"}),
    awful.key({ modkey, "Shift"   }, "h",     function () singlerow_flex.incfactor(-0.1)      end,
              {description = "decrease focused client width (singlerow_flex)", group = "layout"}),
    awful.key({ modkey, "Shift"   }, "equal", function () singlerow_flex.resetfactors()       end,
              {description = "reset all widths to equal (singlerow_flex)", group = "layout"}),
    awful.key({ modkey,    }, "j", function () awful.layout.inc(-1)                end,
              {description = "select previous", group = "layout"}),
    awful.key({ modkey,    }, "k", function () awful.layout.inc( 1)                end,
              {description = "select next layout", group = "layout"}),
    -- Volume control keys
    awful.key({}, "XF86AudioRaiseVolume", function() awful.spawn("wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+") end,
              {description = "increase volume", group = "media"}),
    awful.key({}, "XF86AudioLowerVolume", function() awful.spawn("wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-") end,
              {description = "decrease volume", group = "media"}),
    awful.key({}, "XF86AudioMute", function() awful.spawn("wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle") end,
              {description = "toggle mute", group = "media"})
)

clientkeys = gears.table.join(
    awful.key({ modkey, "Shift"         }, "f",
        function (c)
            c.fullscreen = not c.fullscreen
            c:raise()
        end,
        {description = "toggle fullscreen", group = "client"}),
    awful.key({ modkey, "Shift"   }, "c",      function (c) c:kill()                         end,
              {description = "close", group = "client"}),
    awful.key({ modkey, "Control" }, "space",  awful.client.floating.toggle                     ,
              {description = "toggle floating", group = "client"}),
    awful.key({ modkey, "Shift" }, "t",      function (c) c.ontop = not c.ontop            end,
              {description = "toggle keep on top", group = "client"}),
    awful.key({ modkey,           }, "n",
        function (c)
            c.minimized = true
        end ,
        {description = "minimize", group = "client"}),
    awful.key({ modkey,           }, "m",
        function (c)
            c.maximized = not c.maximized
            c:raise()
        end ,
        {description = "(un)maximize", group = "client"})
)

-- Bind "=" key to the Tasks tag (first tag)
globalkeys = gears.table.join(globalkeys,
    -- View Tasks tag only.
    awful.key({ modkey }, "equal",
              function ()
                    local screen = awful.screen.focused()
                    local tag = screen.tags[1]
                    if tag then
                       tag:view_only()
                    end
              end,
              {description = "view Tasks tag", group = "tag"}),
    -- Toggle Tasks tag display.
    awful.key({ modkey, "Control" }, "equal",
              function ()
                  local screen = awful.screen.focused()
                  local tag = screen.tags[1]
                  if tag then
                     awful.tag.viewtoggle(tag)
                  end
              end,
              {description = "toggle Tasks tag", group = "tag"}),
    -- Move client to Tasks tag.
    awful.key({ modkey, "Shift" }, "equal",
              function ()
                  if client.focus then
                      local tag = client.focus.screen.tags[1]
                      if tag then
                          client.focus:move_to_tag(tag)
                      end
                 end
              end,
              {description = "move focused client to Tasks tag", group = "tag"}),
    -- Toggle Tasks tag on focused client.
    awful.key({ modkey, "Control", "Shift" }, "equal",
              function ()
                  if client.focus then
                      local tag = client.focus.screen.tags[1]
                      if tag then
                          client.focus:toggle_tag(tag)
                      end
                  end
              end,
              {description = "toggle focused client on Tasks tag", group = "tag"})
)

-- Bind all key numbers to tags (skip first tag "Tasks", which is bound to "=")
for i = 1, 9 do
    globalkeys = gears.table.join(globalkeys,
        -- View tag only.
        awful.key({ modkey }, "#" .. i + 9,
                  function ()
                        local screen = awful.screen.focused()
                        local tag = screen.tags[i + 1]
                        if tag then
                           tag:view_only()
                        end
                  end,
                  {description = "view tag #"..i, group = "tag"}),
        -- Toggle tag display.
        awful.key({ modkey, "Control" }, "#" .. i + 9,
                  function ()
                      local screen = awful.screen.focused()
                      local tag = screen.tags[i + 1]
                      if tag then
                         awful.tag.viewtoggle(tag)
                      end
                  end,
                  {description = "toggle tag #" .. i, group = "tag"}),
        -- Move client to tag.
        awful.key({ modkey, "Shift" }, "#" .. i + 9,
                  function ()
                      if client.focus then
                          local tag = client.focus.screen.tags[i + 1]
                          if tag then
                              client.focus:move_to_tag(tag)
                          end
                     end
                  end,
                  {description = "move focused client to tag #"..i, group = "tag"}),
        -- Toggle tag on focused client.
        awful.key({ modkey, "Control", "Shift" }, "#" .. i + 9,
                  function ()
                      if client.focus then
                          local tag = client.focus.screen.tags[i + 1]
                          if tag then
                              client.focus:toggle_tag(tag)
                          end
                      end
                  end,
                  {description = "toggle focused client on tag #" .. i, group = "tag"})
    )
end

clientbuttons = gears.table.join(
    awful.button({ }, 1, function (c)
        c:emit_signal("request::activate", "mouse_click", {raise = true})
    end),
    awful.button({ "Control", "Shift" }, 1, function (c)
        c:emit_signal("request::activate", "mouse_click", {raise = true})
        awful.mouse.client.move(c)
    end),
    awful.button({ "Control", "Shift" }, 3, function (c)
        c:emit_signal("request::activate", "mouse_click", {raise = true})
        awful.mouse.client.resize(c)
    end)
)

-- Set keys
root.keys(globalkeys)

-- Rules
awful.rules.rules = {
    -- All clients will match this rule.
    { rule = { },
      properties = { border_width = beautiful.border_width,
                     border_color = beautiful.border_normal,
                     focus = awful.client.focus.filter,
                     raise = true,
                     keys = clientkeys,
                     buttons = clientbuttons,
                     screen = awful.screen.preferred,
                     placement = awful.placement.no_overlap+awful.placement.no_offscreen
     }
    },

    -- Floating clients.
    { rule_any = {
        instance = {
          "DTA",
          "copyq",
          "pinentry",
        },
        class = {
          "Arandr",
          "Blueman-manager",
          "Gpick",
          "gnome-calculator",
          "keepassxc",
          "Kruler",
          "MessageWin",
          "Sxiv",
          "Tor Browser",
          "Wpa_gui",
          "mpv",
          "veromix",
          "vlc",
          "xtightvncviewer"},

        name = {
          "Event Tester",
        },
        role = {
          "AlarmWindow",
          "ConfigManager",
          "pop-up",
        }
      }, properties = { floating = true }},

    -- Add titlebars to normal clients and dialogs
    { rule_any = {type = { "normal", "dialog" }
      }, properties = { titlebars_enabled = false }
    },
}

-- Signals
client.connect_signal("manage", function (c)
    if awesome.startup
      and not c.size_hints.user_position
      and not c.size_hints.program_position then
        awful.placement.no_offscreen(c)
    end
end)

client.connect_signal("focus", function(c) c.border_color = beautiful.border_focus end)
client.connect_signal("unfocus", function(c) c.border_color = beautiful.border_normal end)

-- Set wallpaper
awful.spawn.with_shell("@FEH_PATH@ --bg-scale @WALLPAPER_PATH@")

-- Start light-locker for screen locking
awful.spawn.with_shell("light-locker --lock-on-suspend")

-- Start flameshot for screenshots
awful.spawn.with_shell("flameshot")
