module Jekyll
  module ExceptionFilter


    # A generic Jekyll Filter that will raise an excpetion from liquid.
    #
    # @param {string} msg - A string representing the actual verbage to display
    #        in the console.
    # @param {string} type = A string representing the type of error to raise
    #        in the console.  The default is "warn" to display a warning
    #        message that would NOT stop the build, just alert the user.
    #        Alternatively, "err" can be used for critical errors shown in red
    #        that halts the build.
    def raise_exception(msg, type = "warn")
    	
    	bad_file = @context.registers[:page]['path']
    	err_msg = "In #{bad_file}: #{msg}"

    	if type == "err"
      	raise err_msg
      else
     		warn err_msg.yellow 
      end

    end

  end
end

Liquid::Template.register_filter(Jekyll::ExceptionFilter)