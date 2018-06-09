Jekyll::Hooks.register :site, :pre_render do |site, payload|
  FrontMatterTests.process(site, payload)
end

module FrontMatterTests

  # Checks if key provided in schema is required
  #
  #
  # @param {string} key  - key name
  # @param {hash} schema - the hash-representation of a schema file
  #
  # Returns true or false depending on the success of the check.
  def self.required?(key, schema)
    is_required = true
    is_primary = schema[key]
    schema['config'] = schema['config'] || { 'optional': [] }
    is_optional = schema['config']['optional'].include?(key)

    if is_primary && !is_optional
      is_required
    elsif (is_primary && is_optional) || (!is_primary && is_optional)
      !is_required
    else
      raise 'The key provided is not in the schema.'
    end
  end

  # Processes a collection against a schema
  #
  # Opens each file in the collection's expected directory and checks the
  # file's frontmatter for the expected keys and the expected format of the
  # values.
  #
  # NOTE - As it iterates through files, subdirectories will be ignored
  #
  # @param {hash} schema - the hash-representation of a schema file
  #
  # Returns true or false depending on the success of the check.
  def self.processCollection(schema)
    dir = File.join(schema['config']['path'])
    passfail = []
    Dir.open(dir).each do |f|
      next if File.directory?(File.join(dir, f))
      file = File.open(File.join(dir, f))
      next if schema['config']['ignore'].include?(f)
      data = YAML.load_file(file)

      passfail.push check_keys(data, schema.keys, f)
      passfail.push check_types(data, schema, File.join(dir, f))
    end
    passfail.keep_if { |p| p == false }
    if passfail.empty?
      return true
    else
      puts "There were #{passfail.count} errors".red
      return false
    end
  end

  # Loads a schema from file.
  #
  # @param {string} file - a string containing a filename
  #
  # Returns a hash loaded from the YAML doc or exits 1 if no schema file
  # exists.
  def self.load_schema(file, config)
    schema = File.join(Dir.pwd, config['path'], file)
    if File.exist?(schema)
      YAML.load_file(schema)
    else
      puts "No schema for #{file}"
      exit 1
    end
  end

  # Checks a hash for expected keys
  #
  # @param {string} target - the hash under test
  # @param {string} keys   - an array of keys the data is expected to have, usually loaded from
  #        a schema file by loadschema()
  # @param {string} title  - A string representing `data`'s name
  def self.check_keys(target, keys, title)
    keys -= ['config']
    unless target.respond_to?('keys')
      puts "The file #{title} is missing all frontmatter.".red
      return false
    end
    diff = keys - target.keys
    if diff.empty?
      return true
    else
      puts "\nThe file #{title} is missing the following keys:".red
      for k in diff
        puts "    * #{k}".red
      end
      return false
    end
  end

  # Validates that the values match expected types
  #
  # @param {string} data - the hash under test
  # @param {hash} schema - the hash-representation of a schema file
  # @param {string} file - a string containing a filename
  def self.check_types(data, schema, file)
    return false unless data.respond_to?('keys')
    schema.each do |s|
      key = s[0]
      value = s[1]
      type = if value.class == Hash
               value['type']
             else
               value
             end

      next unless required?(key, schema)
      if key == 'config'
        next
      elsif value.class == Hash
        dict_key = value.values[1]
        dict_key_type = value.values[2]
        if data[key].class == Hash
          if dict_key_type == 'String' && data[key][dict_key].class == String
            next
          else
            puts "\nThe file #{file} is missing the following keys:\n" \
                 "    * #{dict_key}".red
            puts "    * invalid value for '#{dict_key}' in #{file}. " \
                 "Expected #{dict_key_type} but was #{data[dict_key].class}\n\n"
            return false
          end
        else
            puts "\nThe file #{file} is missing the following keys:".red
            puts "    * #{key}".red
            puts "    * invalid value for '#{key}' in #{file}. " \
                 "Expected #{type} but was #{data[key].class}\n\n"
          return false
        end
      elsif type == 'Array' && data[key].class == Array
        next
      elsif type == 'Boolean' && data[key].is_a?(Boolean)
        next
      elsif type == 'String' && data[key].class == String
        next
      elsif type == 'Date'
        next
      else
        puts "    * invalid value for '#{key}' in #{file}. " \
             "Expected #{type} but was #{data[key].class}\n\n"
        return false
      end
    end
  end


  # Initial function that starts the frontmatter tests
  #
  # Returns true or false depending on the success of the checks.
  def self.process(site, payload)
    @processed = true
    config = Jekyll.configuration
    unless config.key?('frontmatter_tests')
      config = { 'path' => File.join('_linter', 'frontmatter-tests') }
    end

    schema = Dir.open(config['path'])
    schema.each do |s|
    next unless s.start_with?('_')
      puts "Testing #{s}".green
      @processed = processCollection(load_schema(s, config))
      puts "Finished testing #{s}".green
    end

    if @processed == false
      raise 'Frontmatter tests failed.'
    end
  end
end
