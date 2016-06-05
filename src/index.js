/**
 * Created by canals on 02/02/2016.
 */

(function() {
    const glob = require('../src/globalgen/global').global;

    const exec = require('child_process').execSync;
    const os = require('os');
    const fs = require('fs');
    const path=require('path');

    var $ = require('jquery');
/*
    var opt ={
        output : 'output',
        texte : 'yo man',
        domaine : 'defaut',
        cible : 'defaut',
        esprit : 'defaut',
        config : '../static/config.json'
    };
*/

    var init = () => {

        console.log(process.env);

        var env = process.env;

        var homed=os.homedir();
        var globaldir, outputd, exportd ;
        if (process.platform === 'win32') {
            globaldir= path.join(homed,'global');
        } else {
            globaldir=path.join(homed,'.global');
        };
        outputd=path.join(globaldir,'output');
        exportd=path.join(globaldir,'export');

        try {
            fs.accessSync(globaldir, fs.F_OK)
        } catch(err) {
            fs.mkdirSync(globaldir);
            console.log(globaldir + ' created');
        };

        try {
            fs.accessSync(outputd, fs.F_OK)
        }catch (err){
            fs.mkdirSync(outputd);
            console.log(outputd + ' created');
        };

        try {
            fs.accessSync(exportd, fs.F_OK)
        }catch (err){
            fs.mkdirSync(exportd);
            console.log(exportd + ' created');
        } ;

        fs.access(exportd, fs.W_OK, (err)=> {
            if (err) {
                alert( exportd + 'non accessible en écriture : export pdf des cartes générées impossible');
                process.exit(-1);
            }
        });
        fs.access(outputd, fs.W_OK, (err)=> {
            if (err) {
                alert( outputd + 'non accessible en écriture : sauvegarde des cartes générées impossible');
                process.exit(-1);
            }
        });

        env.PATH = '/usr/local/bin:'+env.PATH;
        return {
            outputdir: outputd,
            exportdir: exportd,
            homedir: homed,
            appdir : path.dirname(__dirname),
            env:env
        };


    };
    var get =  ()=> {
        var nom = $("#main-global-nom").val() ;
        return {
            outputf : nom.replace(' ', '_'),
            texte   : nom,
            domaine : $("input:radio[name=domaine]:checked").val(),
            cible   : $("input:radio[name=cible]:checked").val(),
            esprit  : $("input:radio[name=esprit]:checked").val(),
            config  : 'static/config.json'
        }
    };
    
    var convert = (f, d) => {
       try {
           var cmd =  path.join(d.appdir,'scripts/convert.sh')+' '+path.join(d.outputdir, f)+' '+d.exportdir ;
           console.log(cmd);
           exec(cmd , {env: d.env});
        } catch (error) {
            console.log(error);
       }
        
    };

    var show_generated = (res, dirs) => {

        var base = path.basename(res.outputf, '.svg');

        var svg_url=`file://${dirs.outputdir}/${base}.svg`;
        var pdf_url=`file://${dirs.exportdir}/${base}.exported.pdf`;
        var png_url=`file://${dirs.exportdir}/${base}.exported.png`;

        //$('#img-svg').replaceWith('<img id="img-svg" src="'+svg_url+'">');
        $('#img-svg').attr('src', svg_url);console.log(svg_url);
        $('#dl-svg').attr('href', svg_url);
        $('#dl-pdf').attr('href', pdf_url);
        $('#dl-png').attr('href', png_url);

        $("div#after-cmd > div").text('généré en combinant : '+res.esprit+' + '+ res.domaine +
                                        ' couleurs : bando: '+res.bando+' ; typo: '+res.typo+' ; picto:'+res.picto
                                        )

    };

    $(document).ready( () => {

        var dirs = init();
        console.log(dirs);

        $("#generate").click( (event) => {
                event.preventDefault();
                var opt = get();
                glob.init(opt, dirs);
                var res= glob.do();
                console.log(res);

                convert( res.outputf, dirs);
                show_generated(res, dirs);
                $("div#after-cmd ul").show();

        } );


    });


} ) ();





