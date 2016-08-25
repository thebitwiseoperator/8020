# Author:   Andrew Nystrom | andrew.nystrom@totmarketing.com
# Date:     2016-02-17
# Version:  1.0

# Class to change the foreground color of strings in the terminal.
class String
    def red;            "\e[31m#{self}\e[0m" end
end
# This function holds the manifest XML.
def output_manifest(title)
    puts '<?xml version="1.0" standalone="no" ?>'.red
    puts '<manifest identifier="D321SCORM-MANIFEST" version="1.0"'.red
    puts 'xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"'.red
    puts 'xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"'.red 
    puts 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'.red 
    puts 'xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                            http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd
                            http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd" >'.red 
    puts '<metadata>'.red 
    puts '<schema>ADL SCORM</schema>'.red 
    puts '<schemaversion>1.2</schemaversion>'.red 
    puts '<adlcp:location>imsmetadata.xml</adlcp:location>'.red 
    puts '</metadata>'.red 
    puts '<organizations default="TOC1">'.red 
    puts '<organization identifier="TOC1">'.red 
    puts "<title>#{title}</title>".red 
    puts '<item identifier="I_SCO0" identifierref="SCO0">'.red 
    puts "<title>#{title}</title>".red
    puts '</item>'.red
    puts '</organization>'.red 
    puts '</organizations>'.red
    puts '<resources>'.red
    puts '<resource identifier="SCO0" type="webcontent" adlcp:scormtype="sco" href="index.html">'.red

    Dir.glob("**/*").each do |fname|
        puts "<file href=\"#{fname}\" />".red if File.file?(fname)
    end
    puts '<dependency identifierref="ALLRESOURCES" />'.red 
    puts '</resource>'.red 
    puts '<resource identifier="ALLRESOURCES" type="webcontent" adlcp:scormtype="asset">'.red 
    puts '</resource>'.red 
    puts '</resources>'.red 
    puts '</manifest>'.red
end 
# Introduction to the user. 
puts "Hello! Let's start building the contents of your manifest file.".cyan
puts "What is the title of your project?".cyan 
# Set the title based on input 
title = gets.chomp
# Notice to the user that this worked. 
puts "Thanks! You have entered '#{title}'. Your manifest is below in" + " RED".red
# Two seconds of pause for readability. 
sleep 2
# Dump the manifest
output_manifest(title)