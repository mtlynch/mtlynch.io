module Jekyll
  module Commands
    class FrontmatterTest < Command

      class << self

        # Sets the Jekyll command to run as "yml-test"
        #
        # @param {prog} program instance - the Jekyll program itself. This
        #        parameter is required to be passed in to the command in
        #        order to register the custom command with Jekyll.  For more
        #        information see Jekyll docs:
        #        https://jekyllrb.com/docs/plugins/#commands
        def init_with_program(prog)
          prog.command(:'yml-test') do |c|
            c.syntax 'yml-test'
            c.description 'Validates yml of markdown files for the site'
            c.alias :yt

            c.action do |args, options|
              Jekyll::Commands::FrontmatterTest.process(options)
            end
          end

          # Validates frontmatter for a file to ensure it has:
          #     - required keys.
          #     - keys that have valid and expected data types.
          def process(options)
            # Adjust verbosity for logging quickly
            Jekyll.logger.adjust_verbosity(options)

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

          # Loads a schema from file.
          #
          # @param {string} schema_filename - a string containing the schema
          #        filename.
          # @param {object} config - an object containing configuration
          #        information.  Currently this only includes the schema's path
          #        but it could conceivably this could contain other
          #        configuration information in the future.
          #
          # Returns a hash loaded from the YAML doc or exits 1 if no schema
          # file exists.
          private_class_method def self.load_schema(schema_filename, config)
            schema = File.join(Dir.pwd, config['path'], schema_filename)
            if File.exist?(schema)
              YAML.load_file(schema)
            else
              puts "No schema for #{schema_filename}"
              exit 1
            end
          end

          # Processes a collection against a schema.
          #
          # Opens each file in the collection's expected directory and checks
          # the file's frontmatter for the expected keys and the expected
          # format of the values.
          #
          # NOTE - As it iterates through files, subdirectories will be
          # ignored.
          #
          # @param {hash} schema - the hash-representation of a schema file.
          #
          # Returns true if all files pass the frontmatter checks defined in
          # the schema.
          private_class_method def self.processCollection(schema)
            dir = File.join(schema['config']['path'])
            invalid_files = []
            Dir.open(dir).each do |f|
              next if File.directory?(File.join(dir, f))
              file = File.open(File.join(dir, f))
              next if schema['config']['ignore'].include?(f)
              data = YAML.load_file(file)

              invalid_files.push check_keys(data, schema.keys, f)
              invalid_files.push check_types(data, schema, File.join(dir, f))
            end
            invalid_files.keep_if { |p| p == false }
            if invalid_files.empty?
              return true
            else
              puts "There were #{passfail.count} errors".red
              return false
            end
          end

          # Checks if key is required in schema.
          #
          # @param {string} key  - key name.
          # @param {hash} schema - the hash-representation of a schema file.
          #
          # Returns true if key is found and required.
          private_class_method def self.required?(key, schema)
            is_required = true
            is_primary = schema[key]
            schema['config'] = schema['config'] || { 'optional': [] }
            is_optional = schema['config']['optional'].include?(key)

            if is_primary && !is_optional
              is_required
            elsif (is_primary && is_optional) || (!is_primary && is_optional)
              !is_required
            else
              raise 'The following key provided is not in the schema: #{key}'
            end
          end

          # Checks a hash for expected keys.
          #
          # @param {hash} target - the hash being tested for valid keys.
          # @param {array} keys - an array of keys the data is expected to
          #        have, usually loaded from a schema file by load_schema().
          # @param {string} filename  - A string representing the name of the
          #        file being tested for expected frontmatter keys.
          #
          # Returns true if all required keys are found.
          private_class_method def self.check_keys(target, keys, filename)
            keys -= ['config']
            unless target.respond_to?('keys')
              puts "The file #{filename} is missing all frontmatter.".red
              return false
            end
            diff = keys - target.keys
            if diff.empty?
              return true
            else
              puts "\nThe file #{filename} is missing the following keys:".red
              for k in diff
                puts "    * #{k}".red
              end
              return false
            end
          end

          # Validates that the frontmatter keys match expected types in the
          # schema.
          #
          # @param {hash} target - the hash being tested for valid keys.
          # @param {hash} schema - the hash-representation of a schema file.
          # @param {string} filename  - A string representing the name of the
          #        file being tested for expected frontmatter keys.
          #
          # Returns true if all frontmatter keys are valid.
          private_class_method def self.check_types(target, schema, filename)
            return false unless target.respond_to?('keys')
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
                if target[key].class == Hash
                  if dict_key_type == 'String' && target[key][dict_key].class == String
                    next
                  else
                    puts "\nThe file #{filename} has the following problems with" \
                         " it's key:\n".red
                    puts "    * #{dict_key}".red
                    puts "    * invalid value for '#{dict_key}' in #{filename}. " \
                         "Expected #{dict_key_type} but was " \
                         "#{target[dict_key].class}\n\n"
                    return false
                  end
                else
                    puts "\nThe file #{filename} has the following problems with" \
                         " it's key:\n".red \
                    puts "    * #{key}".red
                    puts "    * invalid value for '#{key}' in #{filename}. " \
                         "Expected #{type} but was #{target[key].class}\n\n"
                  return false
                end
              elsif type == 'Array' && target[key].class == Array
                next
              elsif type == 'Boolean' && target[key].is_a?(Boolean)
                next
              elsif type == 'String' && target[key].class == String
                next
              elsif type == 'Date'
                next
              else
                puts "    * invalid value for '#{key}' in #{filename}. " \
                     "Expected #{type} but was #{target[key].class}\n\n"
                return false
              end
            end
          end

        end # end of init_with_program
      end # end of class << self

    end
  end
end
