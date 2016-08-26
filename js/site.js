/***** -- This object is considered a CORE member. You probably don't need to modify this. Read the documentation. -- ******/
var GSIDefaults = {
    trainingName: "Default Training Name",
    //The name of the product. This is in the main navigation. 
    productName: "Default Product Name",
    modelName: "Default Model Name",
    //The default fade duration for the legal modal window. Can take 'fast', 'slow' or an int.
    fadeDuration: "slow",
    language: "",
    //This function will instantly write the product name wherever it's invoked. For now, in the main navigation.
    writeProductName: function () {
        document.write(GSI.productName);
    },
    //This function opens the legal modal.
    openLegal: function () {
        $("#legal").load("html/legal.html");
        $("#legal").fadeIn(GSIDefaults.fadeDuration);
    },
    closeLegal: function () {
        $("#legal").fadeOut(GSIDefaults.fadeDuration);
    },
    //This function will instantly switch the HTML of the main-content division whenever it's invoked.
    switchPage: function (pageName) {
        /*If the page name is home use the content from index.html otherwise use the content from the HTML folder 
        where 'pageName' is the name of the file sans the extension. */
        $('#main-content').load('html/' + pageName + '.html');
        this.sanitizeNavigation();
    },
    changeSiteTitle: function () {
        document.title = GSI.trainingName;
    },
    setLanguage: function (language) {
        GSI.language = language;
    },
    writeCurrentLanguage: function () {
        document.write(GSI.language);
    }
};
var GSIOptions = {
    trainingName: "LG Minibeam Projectors",
    productName: "LG Minibeam Projectors",
    fadeDuration: "fast",
    audioIsMuted: false,
    modelsIsOpen: false,
    featuresIsOpen: false,
    resetTraining: function () {
        GSI.switchPage('home-page');
    },
    toggleSettings: function () {
        $("#settings-box").fadeToggle("fast");
        GSI.settingsTimer();
    },
    settingsTimer: function () {
        setTimeout(function () {
            $("#settings-box").fadeOut("fast");
        }, 5000);
    },
    setLoopVolume: function () {
        if ($("#audio-loop")) $("#audio-loop").prop("volume", 0.2);
    },
    toggleMuteVoice: function () {
        $("#vocal-track").prop('muted', !$("#vocal-track").prop('muted'));
        $("#video").prop('muted', !$("#video").prop('muted')); 
        $(".voice-on").toggleClass("voice-off");
        this.audioIsMuted = !this.audioIsMuted;
    },
    toggleTopNavigation: function () {
        $('#hamburger-stack').toggle();
        $('#navigation-bar').toggle();
        $('#close-navigation-button').toggle();
        this.sanitizeNavigation();
    },
    toggleFeatures: function () {
        $('#models-container').hide();
        $('#features-container').toggle();
        this.featuresIsOpen = !this.featuresIsOpen;
    },
    toggleModels: function () {
        $('#features-container').hide();
        $('#models-container').toggle();
        this.modelsIsOpen = !this.modelsIsOpen;
    },
    playAudio: function () {
        if (this.audioIsMuted) {
            $("#vocal-track").prop('muted', true);
            $(".voice-on").addClass('voice-off');
        }
        $("#vocal-track")[0].play();
    },
    videoSound: function () { 
        if(this.audioIsMuted) { 
            $("#video").prop('muted', true); 
            $(".voice-on").addClass('voice-off'); 
        }
    }, 
    sanitizeNavigation: function () {
        if (this.modelsIsOpen) this.toggleModels();
        if (this.featuresIsOpen) this.toggleFeatures();
    }
};
/*This creates the GSI object and combines GSIDefaults and GSIOptions. It does not modify GSIDefaults.*/
var GSI = $.extend({}, GSIDefaults, GSIOptions);