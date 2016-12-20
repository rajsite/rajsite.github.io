---
layout: post
title: Getting Started - Web Components Series
---
Who does this series target:

At a minimum you should be very familiar with or have worked through all of the examples in the Web Services Getting Started Series. This series of tutorials is targeted to users who are comfortable creating LabVIEW Web Services and are able to follow the JavaScript complexity used in the Getting Started Series.

Key points: Stop now and head back unless you love beautiful, mobile-friendly, and modern web apps as well as learning about tools that make web programming awesome

What are Web Components and why use them?:

Web components are a modern way to bundle up pieces of JavaScript + HTML + CSS into reusable chunks. By modularizing and encapsulating code into reusable pieces we can avoid having to re-create a lot of features and in the end hopefully write less code that looks cleaner. Also by taking a Web Component approach to development we enable re-use of a lot of existing code in a maintainable manner.

Being a modern approach to web development, it is important to understand that the technology is targeted to modern browsers. In general that means this series is only targeted to users of browsers such as IE11+ and the latest versions of Chrome, Firefox, and Safari (as well as only the latest version of mobile operating systems and mobile browsers).

Key points: Web components enable lots of code reuse but require modern browsers to use many features

Web Component Concepts:

Web Components is an umbrella term that defines code using a mixture of the following features: Custom Elements, HTML Imports, HTML Templates, and Shadow DOM. Not all Web Components will rely on all of these features and not all of the browsers (even the newest versions of all the browsers) support all of these features.

What this means as developers using Web Components is that we need to import a JavaScript library that will implement these features for us. A JavaScript library that fills in feature gaps to implement standards between different browsers is known as a polyfill (as opposed to JavaScript libraries that add new unique features to the browser). An example of a fairly commonly used polyfill is the CSS Pie JavaScript library that enables CSS drop shadow support in older Internet Explorer browsers. An example of a very common library that is not considered a polyfill would be the jQuery JavaScript library. The features added by jQuery are not part of the JavaScript language or a browser standard and the jQuery features are instead completely hidden in the '$' and 'jQuery' objects.

The most feature complete and highly developed polyfill for the 4 standards mentioned above (Custom Elements, HTML Imports, HTML Templates, and Shadow DOM) is the webcomponents.js polyfill. There are also several JavaScript libraries that depend on the webcomponents.js polyfill such as Google Polymer, Mozilla X-Tags, and Bosonic. These JavaScript Libraries add features to the browser that are not in any of the 4 standards mentioned above but the features added to the browser make Web Components easier to use.

These tutorials will as much as possible avoid features that are specific to any specific JavaScript library (Polymer, X-Tags, jQuery) and will instead focus on using JavaScript and existing Web Components directly to power our applications. This means we will be using the webcomponents.js polyfill, and even if the Web Components we use rely on a library like Polymer, X-Tags, etc. we won't be dealing with library specific features directly. However, if you decide to make applications more complex than the demos we provide it is highly recommend that you leverage the features in those JavaScript libraries to make your life easier.

Key points: Web components use parts of four different specifications and we need a polyfill to use the specifications until they are a standard part of all major browsers. In addition, the series will try to avoid writing code examples that depends on specific JavaScript libraries (even if the imported web components themselves utilize some libraries).

Instructions:

This getting started example will be fairly long but it is important to follow it closely and get a grasp of the tools we will be using in the rest of the series. By the end of the guide you should be aware of how to verify that all the tools you need are installed and run the demo web application.

Step 1: Install the tools that help us manage code and install other tools

Modern web development leverages a lot of powerful tools in order to keep us organized, have code be maintainable, and to give us work flows to get up and running quicker. You will need to install the following tools to complete this series:

Node.js: https://nodejs.org/
Github for Windows (or your git tool of choice): https://windows.github.com/
LabVIEW 2014 or higher: http://www.ni.com/download-labview/

Note: Most of the tools we will use are command line applications. Know how to open the command line, how to navigate to different directories, and how to run commands

Note: The series focuses on Windows but everything should work on Mac and Linux as well but may require slightly different set-up and commands.

Key points: Install the three tools we need for the demo (Node.js, Github for Windows or other git client, LabVIEW 2014 or higher)

Step 2: Download the getting started project named lvwd-components-start hosted on Github

With the Github client installed you should be able to go to the following url: https://github.com/rajsite/lvwd-components-start

And press the Clone in Desktop button

Choose a location to save the project and let it sync the latest revision

To look at the contents of the project navigate to the folder location on the disk and as a quick shortcut you can press the Settings gear >> Open in Explorer

The following is a quick overview of the project directory:

- lvwd-components-start/
    - .bowerrc : configuration file for bower and used here to tell bower to install components to the web/dev folder
    - .gitignore : git uses to ignore files that don't need to be saved and shared (build files, temp files, logs)
    - .travis.yml : used by the Travis continuous integration service to tests for the web application
    - LICENSE
    - package.json : defines the npm package for the project and being used to keep a list of the tools we will need to use
    - README.md
        - lv/
            - Web Resources SubVIs/ : SubVIs used by the Web Resources VIs that are organized by resource
                - calc/ : SubVIs corresponding to calculator resources
                    - add/ : SubVIs used by the add.vi endpoint
                        - Parse JSON and Add.vi : Takes a JSON string containing two numbers and returns the sum of the numbers in a JSON string
                - lvwd-components-start-calc.lvlib : LabVIEW Library to manage calculator web resource SubVIs
            - Web Resources/ : Contains the VIs that define the web service endpoints organized as resources
                - calc/ : End points that correspond to calculator resources
                    - add.vi : Endpoint accepts POST requests of JSON message data and returns JSON responses. Corresponds to /lvwd-components-start/calc/add
            - Utilities/ : SubVIs used by the web service that are not specific to any resource
                - Write JSON Response.vi : Sets the mime-type header of the response to "application/json" and outputs the JSON Response string using Web Service streaming VIs. If an error occurred then an error JSON object is returned instead of the provided JSON Response string.
                - Webservice Error Codes.vi : A place to store custom error messages and error codes for the web application
                - lvwd-components-start-utilities.lvlib : LabVIEW library to manage utility VIs not specific to any resource
            - lvwd-components-start.lvproj : Project that contains the web service descriptor and references to the web app files
        - web/ : Stores the dev folder and is also the root directory for build output of the project
            - dev/ : The source code used for development of the web app
                - bower.json : keeps a list of all the source dependencies of our web app and can install them using bower
                - index.html : main page of the web app that is served to users (additional html pages should be placed in this folder)
                - css
                    - start.css : styles associated with the web app (additional css not managed by bower should be placed in this folder)
                - js
                    - start.js : scripts used by the web app (additional scripts not managed by bower should be placed in the folder)

Key points: Make a clone of the git repository and get familiar with the directory layout

Step 3: Verify that a git client and the npm tool are installed and available from the command line

If you are using the Github for Windows client mentioned in Step 1 you can open a command line that will have the git tool added to the system path by opening the Github for Windows application, selecting the lvwd-components-start project, pressing the settings gear, and choosing Open in Git Shell:

Pressing Open in Git Shell will open a command line window similar to the following (a Windows PowerShell window by default):

Verify that the git command is available in the command line by running the following command:
git

Example output from running the git command:

If the git command is not available then make sure that you opened the window using the instructions at the start of this step or if you are not using Github for Windows, install a different git client and verify that it is on the path. For some examples of using alternate git clients, you can try the following LabVIEW Hacker article: https://labviewhacker.com/doku.php?id=learn:software:github

Verify that the node package manager is installed by running the following command:

npm

Example output from running the npm command:

Key points: We have opened a command line window in the root directory of the project with git and npm available on the path

Step 4: Use Node Package Manager (npm) to install tools that will help manage dependencies as well as build and test the web app

Using the instructions from Step 3 you should now have a command line window open in the root directory ( lvwd-components-start/ ) of the application.

Now run the following command to install the packages we need from the node package manager:

npm install

Running the command from the project directory in the command line will cause the npm tool to look at the package.json file and install the tools mentioned in the devDependencies section (and dependencies if we had one). The output will look similar to the following and should take longer to complete if the files are not cached:

Note: By running the command without any flags this will install the tools we will be using in our application locally in the lvwd-components-start/node_modules directory. On many tutorials you will frequently see instructions to install tools globally on the system using the "-g" option. While installing tools globally adds a small amount of convenience, it leads to what is lovingly referred to as Dependency Hell: http://en.wikipedia.org/wiki/Dependency_hell. Only installing tools locally lets us rest assured that if our application and all of its dependencies are inside the lvwd-components-start directory and backing up the folder will backup the vast majority of the application (besides the versions of node, git and LabVIEW installed) while preventing conflicts between projects on our system.

Key points: We have used npm to locally install all of the tools our application uses

Step 5: Use bower to install the source code dependencies that are used to program the web app

Using the instructions from Step 3 (or Step 4) you should have a command line window open in the root directory ( lvwd-components-start/ ) of the application. Make sure you followed Step 3 to verify that git is available and Step 4 to use npm to install tools we will be using locally.

Now run the following command to install the packages we need from the bower package manager (the bower package manager is one of the tools installed by Step 4):

npm run bower -- install

Note: If you have used a global install of bower before you may be wondering why we did not just run "bower install". The reason is that we have installed bower locally into the node_modules/ folder. The "npm run" command is used to run tools installed locally in this way:

npm run <script> -- <args>

So first we made a script named bower in package.json that just runs the command "bower" (yes it is kind of redundant, but hopefully will be changed in the future: https://github.com/npm/npm/issues/1543).

Next, it's important to know that any script you use with the "npm run" command will behave as if it is running in the directory with the package.json file. We want bower to install components with all of our other files in the web folder. Due to this, we have the .bowerrc file that will make sure to place files where we expect in the web/dev/bower_components directory.

So what happens when we run the command "npm run bower -- install" from ANY SUBDIRECTORY in the web app is that npm checks for the script named "bower" in package.json, takes the value returned by the script, adds on the argument "install", and runs that command for us in the directory lvwd-components-start/ directory. We can actually see this logic in the start of the command line output:

Key points: We saw how to run bower when it is installed locally and got an idea of exactly what happens when we run a tool locally with "npm run"

Step 6: Verify that common errors are not in the JavaScript source

One thing you will notice with JavaScript is that the language does not require a compile step to run. While this makes updating and executing code fairly quick (save the file and refresh the page), it does mean that we need some kind of tooling to find simple errors for us quickly. One common tool is called a linter which looks through your files saved on the disc and without running is able to see if common errors exist (static analysis). In the package.json file you can see we have the linter named jslint installed locally. Jslint is a fairly agressive (very strict) linter that is widely used. Another common linter that is more configurable is the pair of tools jshint and jscs. If you are still fairly new to js development I strongly recommend sticking to jslint until you are well versed enough to follow your own customizations in jshint and jscs.

If you look at the top of the lvwd-components-start/web/dev/js/start.js file you will see the following:

/*jslint browser: true, devel: true, white: true*/

These configuration options should be at the top of each js file you write and they tell jslint that we expect this JavaScript code to run in the browser so the tool should not complain about browser specific objects such as document and window. In addition, we are in developer mode which prevents jslint from complaining about usage of developer targeted features such as the console object. Finally we tell jslint to be a little bit more lenient than usual in regards to whitespace.

To run js lint, make sure you have a command line window open in the directory like from step 3. In the command-line window run the jslint command and have it target all of the JavaScript files we have developed:

npm run jslint -- web/dev/js/*

And you will see output similar to the following:

Good to know that the linter does not find any major flaws in the syntax and style of the JavaScript that was written so far. To make linting a little bit easier, a script has been added to the package.json file that acts as a shortcut to linting. To execute the lint script in package.json run the following shortcut command in the console:

npm run lint

For a more thorough discussion about linting including some suggestions for JavaScript editing environments that perform linting automatically on file saves see the following question:

Question: How can you check for common errors without having to run your web app?
Answer: See how to use a JavaScript linting tool in Web Components Series - Appendix A - Linting is Literally a Lifesaver

Step 7: Lets finally run the Web Application

Good work! If you made it this far you have now installed all the tools and source dependencies for the web application and are ready to fire up the web application. You have also linted the JavaScript source to make sure no major syntax or style errors are present. At this point you should see two new directories in the project directory:

- lvwd-components-start/
    - web/
        - dev/
            - bower_components : Contains the dependencies used by the web app installed from bower in step 5
    - node_modules : Contains the tools used to run different tasks for the web app installed from npm in step 4

Go ahead and open up the LabVIEW project in the following location: lvwd-components-start/lv/lvwd-components-start.lvproj

The lvwd-components-start LabVIEW project will have the following virtual folder layout In the Items view:

- Utilities/
    - lvwd-components-start-utilities.lvlib
        - Webservice Error Codes.vi
        - Write JSON Response.vi
- Web Resources SubVIs/
    - lvwd-components-start-calc.lvlib
        - calc/
            - add/
                - Parse JSON and Add.vi
- lvwd-components-start Web Service Configuration
    - Public Content/
        - dev/
            - bower_components/
                - Lots of files assuming step 5 was completed
            - css/
                - start.css
            - js/
                - start.js
            - bower.json
            - index.html
        - .gitignore
    - Web Resources/
        - calc/
            - add.vi (POST)

Keeping the virtual folder layout close to the actual file layout helps keep the project maintainable but remember that you can switch between the Items and Files view to see where files are actually located on disk

To start the web application for debugging, right-click on the lvwd-components-start Web Service Configuration and choose Start

You will also need to get the url for our index page (which is dependent on your port settings, etc.). To get the url navigate to lvwd-components-start Web Service Configuration/Public Content/dev/index.html, right-click on index.html, choose Show Public URL.

In the URL dialog verify Available Servers is set to Local Debugging, press Copy URL and MAKE SURE TO PRESS CLOSE to exit the URL dialog.

Open your (modern) web browser of choice and navigate to the URL that has been copied to your clipboard. In the page that loads enter a number for first, enter a number for second, press submit, and observe the response

Step 8: How to test different components of the application to troubleshoot unexpected behavior

The lvwd-components-start/ project is composed of two different applications that are communicating with each other. If something is not behaving as expected it may be helpful to test each part of the application separately.

Part A: Testing that the LabVIEW Application Web Server is responding as expected

To perform the test, it is assumed that the lvwd-components-start Web Service has been started as in Step 7 and we want to verify that requests can be made to the service. When the web application is running in the browser, it will be make HTTP requests to the /lvwd-components-start/calc/add endpoint. In this example we will create a throwaway VI to test this endpoint by performing the following steps:

1. Open LabVIEW and create a blank VI
2. Add a POST VI to the block diagram of the new VI
3. Configure the URL terminal of the POST VI to be the location the endpoint is running (see step 7 for an idea of how to get the url for a resource and note that in this case we are retrieving the URL for lvwd-components-start/Web Resources/calc/add.vi (POST) inside of the LabVIEW project)
4. Create a cluster with two strings representing numbers to add. One with the label first and one with the label second
5. Wire the cluster to the Flatten To JSON VI and wire the outputted string to the buffer terminal of the POST VI
6. Create an indicator from the body terminal of the POST VI to see the output when run
7. Don't forget proper error handling

The resulting VI should look similar to the following snippet:

And when the VI is run you should see output similar to the following:

While creating throwaway VIs like this to test an endpoint is definitely possible and not too difficult, it can be more complicated if the web service includes more features such as complex input, api keys, authentication, etc. In addition, having a reliable test suite that is saved can be useful during development to ensure that changes to the web service do not have unintended consequences (regressions) without having to run the web application manually. To find out more about these approaches see the following questions:

Question: How can you tell if your LabVIEW webservice is sending back the data you expect?
Answer: See how to use a HTTP Rest Client in Web Components Series - Appendix B - REST Yourself So You Can Test Yourself

Part B: Testing and revising the Web Application source without starting a LabVIEW Application Web Service

We can statically host the web application files when we want to be able to test the Web Application without having the LabVIEW Application Service started and running on the system. This can be useful if our web application is a single page application that can be tested the browser for rendering and UI or in cases where starting the web application for debugging is complex, such as requiring database configuration, depending on hardware, etc.

Question: How can I develop my web app locally without needing to upload to a server?
Answer: See how to start a local HTTP server in Web Components Series - Appendix C - I'll Make My Own Internet, with LabVIEW or Consoles!

Step 9: How to maintain the quality of the web application

From the set-up and tools used by this application we can see that we have taken great care to make sure that common errors are not introduced into the project. We know that if we make changes we should run the lint command line utility, but how

Question: How can I make sure that everyone runs tests when committing?
Answer: See how to set-up continuous integration in Web Components Series - Appendix D - You Shall Not Pass (Without Thorough Testing)

Step 10: Building a deployable version of the Web Application