/**
 * Created by canals on 02/02/2016.
 */


var fs = require('fs');
const path= require('path');

var global = (function () {

    var loadedConfig ;
    var options ;


    var loadConfig = function (file) {
                var data = fs.readFileSync(file);
                try {
                    return JSON.parse(data);
                }
                catch (err) {
                    console.log('error parsing config file : '+file);
                    console.log(err);
                }
            };
    var getDomaine = function(d) {
                return loadedConfig.domaine[d] || loadedConfig.domaine['defaut'];
             };

    var getCible = function(c) {
        return loadedConfig.cible[c] || loadedConfig.cible['defaut'];
    };
    var getEsprit = function(e) {
                return loadedConfig.esprit[e] || loadedConfig.esprit['defaut'];
            };
    var getSvgDir = function() {
                return path.join( options.dirs.appdir, loadedConfig.svgdir || './svg' );
            };



     return  {
            init : function (  opt, dirs ) {

                loadedConfig = loadConfig(path.join(dirs.appdir, opt.config));
                options= {
                    outputf : ( opt.outputf != undefined ? opt.outputf: 'output')+'.svg',
                    texte   :   (opt.texte != undefined ? opt.texte :'yo man'),
                    domaine : getDomaine(opt.domaine),
                    cible   : getCible(opt.cible),
                    esprit  : getEsprit(opt.esprit),
                    dirs    : dirs

                };


            },

            do : function () {

                var bandofile = path.join( getSvgDir(),options.esprit) ;
                var bando = fs.readFileSync(bandofile, 'utf8')
                    .match(/<g id="bando">([^]*)<\/g>[^]*<\/g>/g)[0]
                    .replace(/fill:#ffffff/g, 'fill:'+options.cible.bando)
                    .replace(/fill:#000000/g, 'fill:'+options.cible.typo)
                    .replace(/stroke:#[abcdef\d]+/g, 'stroke:'+options.cible.typo)
                    .replace(/@@@@@@/, options.texte)
                    .replace(/style="font-weight/, 'style= \"fill:'+options.cible.typo
                                                                        +';font-weight');



                var svg = fs.readFileSync(path.join(getSvgDir(),options.domaine), 'utf8')
                            .replace(/fill:#[abcdef\d]+/g , 'fill:' + options.cible.picto)
                            .replace(/<\/g>[^]*<\/g>/g, '</g>\n' +bando);
                try {
                    fs.writeFileSync(path.join(options.dirs.outputdir, options.outputf), svg);
                } catch (err) {
                        console.log('error writing output file :');
                        console.log(err.message);
                };

                return {
                    esprit  : options.esprit,
                    domaine : options.domaine,
                    typo    : options.cible.typo,
                    bando   : options.cible.bando,
                    picto   : options.cible.picto,
                    texte   : options.texte,
                    outputf : options.outputf


                }

            }



    }

}) ();


exports.global = global ;

