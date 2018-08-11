module Jekyll
  module ExceptionFilter


    # A generic Jekyll Filter that will raise an excpetion from liquid.
    #
    # @param {string} msg - A string representing the actual verbage to display
    #        in the console.
    # @param {string} type = A string representing the type of error to raise
    #        in the console.  This can either be:
    #          - "warning" - Displays a warning message that does NOT stop the
    #                        build, simply used to alert the user.
    #          - "error"   - Used for critical erros and halts the build on
    #                        first occurence fo the problem.
    def raise_exception(msg, type)
    	
    	bad_file = @context.registers[:page]['path']
    	err_msg = "In #{bad_file}: #{msg}"

    	if type == "warning"
      	warn err_msg.yellow 
      else
     		raise err_msg
      end

    end

  end
end

Liquid::Template.register_filter(Jekyll::ExceptionFilter)