/**************************************************************************************************
 * Methods to generate the invoice pdf
 **************************************************************************************************/

// driver function for creating the invoice pdf from a json object
function generateForms(save_to_device) {

    var doc = new jsPDF();

    var images = [];

    images[0] = new Image();
    images[0].src = 'img/1bis.png';

    images[1] = new Image();
    images[1].src = 'img/2bis.png';

    images[2] = new Image();
    images[2].src = 'img/3bis.png';

    images[3] = new Image();
    images[3].src = 'img/4bis.png';

    images[4] = new Image();
    images[4].src = 'img/5bis.png';

    var imageCount = 5;
    var imagesLoaded = 0;

    var data = getFormulaire1Inputs();

    for (var i=0; i<imageCount; i++){
        images[i].onload = function () {
            imagesLoaded ++;
            if (imagesLoaded === imageCount){
                ecriture(doc, data, images, save_to_device);
            }
        }
    }
}

function ecriture(doc, data, images, save_to_device) {

    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();

    doc.addImage(images[0] , 'png', 0, 0, width, height);
    setPage1Inputs(doc, data);
    doc.addPage();

    doc.addImage(images[1] , 'png', 0, 0, width, height);
    setPage2Inputs(doc, data);
    doc.addPage();

    doc.addImage(images[2] , 'png', 0, 0, width, height);
    setPage3Inputs(doc, data);
    doc.addPage();

    doc.addImage(images[3] , 'png', 0, 0, width, height);
    setPage4Inputs(doc, data);
    doc.addPage();

    doc.addImage(images[4] , 'png', 0, 0, width, height);
    setPage5Inputs(doc, data);

    if (save_to_device) {
        var nom_document = "FORMULAIRES.pdf";
        doc.save(nom_document);
    }
    else {
        window.open(doc.output('bloburl'));
    }
}

function financial(x) {
    return Number.parseFloat(x).toFixed(2);
}

function round2Decimals(x){
    return Math.round((x + 0.00001) * 100.00) / 100.00;
}

function generatePageNumbers(doc){
    var pageSize = doc.internal.pageSize;
    var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
    var pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(8);
    for(var i=0; i < pageCount; i++){
        doc.setPage(i);
        doc.text(doc.internal.getCurrentPageInfo().pageNumber + "/" + pageCount, 200, pageHeight - 8, {align: 'right'});
    }
}

function getFormulaire1Inputs(){

    var data;
    // var numero_entreprise = "0737.656.987";
    // var nom = "MOSAFOOD";
    // var forme_legale = "S.R.L.";
    // var rue = "Grand Place";
    // var numero_rue = "24";
    // var boite = "101";
    // var code_postal = "7100";
    // var localite = "La Louvière";
    // var pays = "Belgique";
    // var objet_acte = "Nomination d'un gérant";
    // var texte = "Je suis le texte.";
    // var soussigne = "AMIRI";
    // var soussigneP = "Assad";
    // var agissant_comme = "administrateur";
    // var fait_a = "La Louvière";
    // var date = "18/07/2020";
    // var forme_legale_new = "S.P.R.L.";
    // var rue_new = "Petite Place";
    // var numero_new = "124";
    // var boite_new = "121";
    // var code_postal_new = "7200";
    // var localite_new = "7300";
    // var pays_new = "Belgique";



    var numero_entreprise = document.getElementById('numero_entreprise').value;
    var nom = document.getElementById('nom').value;
    var forme_legale = "";
    if ($('#select_forme_legale').val() !== "" && $('#select_forme_legale').val() !== null){
        forme_legale = $('#select_forme_legale').val();
    }
    var rue = document.getElementById('rue').value;
    var numero_rue = document.getElementById('numero_rue').value;
    var boite = document.getElementById('boite').value;
    var code_postal = document.getElementById('code_postal').value;
    var localite = document.getElementById('localite').value;
    var pays = document.getElementById('pays').value;
    var objet_acte = "";
    if ($('#select_objet_acte').val() !== "" && $('#select_objet_acte').val() !== null){
        var temp = $('#select_objet_acte').val();
        for (var i=0; i < temp.length; i++){
            if (i > 0) {
                objet_acte += " - ";
                if (i % 2 === 0) objet_acte += "\n";
            }
            objet_acte += temp[i];
        }
    }
    var rue_new = document.getElementById('rue_new').value;
    var numero_new = document.getElementById('numero_new').value;
    var boite_new = document.getElementById('boite_new').value;
    var code_postal_new = document.getElementById('code_postal_new').value;
    var localite_new = document.getElementById('localite_new').value;
    var pays_new = document.getElementById('pays_new').value;
    var texte = document.getElementById('texte').value;
    var soussigne = document.getElementById('soussigne').value.toUpperCase();
    var soussigneP = document.getElementById('soussigneP').value;
    if (soussigneP !== "" && soussigneP !== null) soussigneP = soussigneP.charAt(0).toUpperCase() + soussigneP.substring(1);
    var agissant_comme = "";
    if ($('#select_agissant_comme').val() !== "" && $('#select_agissant_comme').val() !== null) agissant_comme = $('#select_agissant_comme').val();
    var fait_a = document.getElementById('fait_a').value;
    var date = document.getElementById('date').value;
    var forme_legale_new = "";
    if ($('#select_forme_legale_new').val() !== "" && $('#select_forme_legale_new').val() !== null){
        forme_legale_new = $('#select_forme_legale_new').val();
    }

    data = [numero_entreprise, nom, forme_legale, rue, numero_rue, boite, code_postal, localite, pays, objet_acte, texte, soussigne, soussigneP, agissant_comme, fait_a, date, forme_legale_new, rue_new, numero_new, boite_new, code_postal_new, localite_new, pays_new];
    return data;
}

function setPage1Inputs(doc, data) {
    var numero_entreprise = data[0];
    var nom = data[1];
    var forme_legale = data[2];
    var rue = data[3];
    var numero_rue = data[4];
    var boite = data[5];
    var code_postal = data[6];
    var localite = data[7];
    var pays = data[8];

    var x_pos = 96;
    var y_pos = 81.5;

    doc.setFontSize(11);
    doc.setFontType("bold");
    addText(doc, x_pos, y_pos, numero_entreprise);

    x_pos -= 5;
    y_pos += 6;
    addText(doc, x_pos, y_pos, nom);

    x_pos -= 2;
    y_pos += 16.5;
    addText(doc, x_pos, y_pos, forme_legale);

    x_pos -= 11;
    y_pos += 11;
    addText(doc, x_pos, y_pos, rue);

    x_pos += 60;
    addText(doc, x_pos, y_pos, numero_rue);

    x_pos += 40;
    addText(doc, x_pos, y_pos, boite);

    x_pos -= 88;
    y_pos += 6;
    addText(doc, x_pos, y_pos, code_postal);

    x_pos += 34;
    addText(doc, x_pos, y_pos, localite);

    x_pos -= 45;
    y_pos += 6.5;
    addText(doc, x_pos, y_pos, pays);
}

function setPage2Inputs(doc, data){
    var numero_entreprise = data[0];
    var nom = data[1];
    var forme_legale = data[2];
    var rue = data[3];
    var numero_rue = data[4];
    var boite = data[5];
    var code_postal = data[6];
    if (code_postal !== ""){
        code_postal = ' - ' + code_postal;
    }
    var localite = data[7];
    var objet_acte = data[9];
    var texte = data[10];
    if (boite !== ""){
        boite = " Bte " + boite;
    }
    else{

    }

    var x_pos = 80;
    var y_pos = 68.5;

    doc.setFontSize(11);
    doc.setFontType("bold");
    addText(doc, x_pos, y_pos, numero_entreprise);

    y_pos += 8.5;
    addText(doc, x_pos, y_pos, nom);

    y_pos += 11.5;
    addText(doc, x_pos, y_pos, forme_legale);

    y_pos += 6.5;
    addText(doc, x_pos, y_pos, rue + " " + numero_rue + boite + code_postal + " " + localite);

    x_pos -= 12;
    y_pos += 10;
    doc.text(x_pos, y_pos, objet_acte.toString(), {maxWidth: 120, align: "justify"});

    x_pos -= 26;
    y_pos += 5.5;

    var longueur = $('#select_objet_acte').val();
    for(var i=0; i < longueur.length; i++){
        if (i > 0){
            if (i % 2 === 0) y_pos += 6;
        }
    }

    doc.setFontSize(9);
    doc.setFontType("normal");

    addText2(doc, x_pos, y_pos, getDateLettrer());

    var souligner = false;
    y_pos += 10;
    let premiereResolution = function () {
        addText2(doc, x_pos, y_pos, "premiere resolution".toUpperCase());
        if (souligner) {
            doc.setFillColor(0, 0, 0);
            doc.rect(x_pos, y_pos + 0.5, 48.5, 0.2, 'F');
        }

        y_pos += 5;
        if ($('#select_objet_acte').val().length > 0 && $('#select_objet_acte').val() !== null) {
            var temp = $('#select_objet_acte').val();
            if (temp[0].includes('Transfert des')) {
                addText2(doc, x_pos, y_pos, cession());

                for(var i=0; i<getTailleListeDesCessions(); i++) y_pos += 5;
            }
            if (temp[0].includes('Démission')) addText2(doc, x_pos, y_pos, demission());
            if (temp[0].includes('Nomination')) addText2(doc, x_pos, y_pos, nomination());
            if (temp[0].includes('Transfert du siège social')) addText2(doc, x_pos, y_pos, transfert());
            if (temp[0].includes('Changement')) addText2(doc, x_pos, y_pos, changement());
        }
        y_pos += 10;
    };
    let deuxiemeResolution = function (){
        addText2(doc, x_pos, y_pos, "deuxieme resolution".toUpperCase());
        if (souligner){
            doc.setFillColor(0,0,0);
            doc.rect(x_pos, y_pos+0.5, 49.5, 0.2, 'F');
        }
        y_pos += 5;
        if ($('#select_objet_acte').val().length > 0 && $('#select_objet_acte').val() !== null) {
            var temp = $('#select_objet_acte').val();
            if (temp[1].includes('Transfert des')) {
                addText2(doc, x_pos, y_pos, cession());
                for(var i=0; i<getTailleListeDesCessions(); i++) y_pos += 5;
            }
            if (temp[1].includes('Démission')) addText2(doc, x_pos, y_pos, demission());
            if (temp[1].includes('Nomination')) addText2(doc, x_pos, y_pos, nomination());
            if (temp[1].includes('Transfert du siège social')) addText2(doc, x_pos, y_pos, transfert());
            if (temp[1].includes('Changement')) addText2(doc, x_pos, y_pos, changement());
        }
        y_pos += 10;
    };
    let troisiemeResolution = function (){
        addText2(doc, x_pos, y_pos, "troisieme resolution".toUpperCase());
        if (souligner){
            doc.setFillColor(0,0,0);
            doc.rect(x_pos, y_pos+0.5, 50, 0.2, 'F');
        }
        y_pos += 5;
        if ($('#select_objet_acte').val().length > 0 && $('#select_objet_acte').val() !== null) {
            var temp = $('#select_objet_acte').val();
            if (temp[2].includes('Transfert des')) {
                addText2(doc, x_pos, y_pos, cession());
                for(var i=0; i<getTailleListeDesCessions(); i++) y_pos += 5;
            }
            if (temp[2].includes('Démission')) addText2(doc, x_pos, y_pos, demission());
            if (temp[2].includes('Nomination')) addText2(doc, x_pos, y_pos, nomination());
            if (temp[2].includes('Transfert du siège social')) addText2(doc, x_pos, y_pos, transfert());
            if (temp[2].includes('Changement')) addText2(doc, x_pos, y_pos, changement());
        }
        y_pos += 10;
    };
    let quatriemeResolution = function (){
        addText2(doc, x_pos, y_pos, "quatrieme resolution".toUpperCase());
        if (souligner){
            doc.setFillColor(0,0,0);
            doc.rect(x_pos, y_pos+0.5, 52.5, 0.2, 'F');
        }
        y_pos += 5;
        if ($('#select_objet_acte').val().length > 0 && $('#select_objet_acte').val() !== null) {
            var temp = $('#select_objet_acte').val();
            if (temp[3].includes('Transfert des')) {
                addText2(doc, x_pos, y_pos, cession());
                for(var i=0; i<getTailleListeDesCessions(); i++) y_pos += 5;
            }
            if (temp[3].includes('Démission')) addText2(doc, x_pos, y_pos, demission());
            if (temp[3].includes('Nomination')) addText2(doc, x_pos, y_pos, nomination());
            if (temp[3].includes('Transfert du siège social')) addText2(doc, x_pos, y_pos, transfert());
            if (temp[3].includes('Changement')) addText2(doc, x_pos, y_pos, changement());
        }
        y_pos += 10;
    };
    let cinquiemeResolution = function (){
        addText2(doc, x_pos, y_pos, "cinquieme resolution".toUpperCase());
        if (souligner){
            doc.setFillColor(0,0,0);
            doc.rect(x_pos, y_pos+0.5, 52.5, 0.2, 'F');
        }
        y_pos += 5;
        if ($('#select_objet_acte').val().length > 0 && $('#select_objet_acte').val() !== null) {
            var temp = $('#select_objet_acte').val();
            if (temp[4].includes('Transfert des')) {
                addText2(doc, x_pos, y_pos, cession());
                for(var i=0; i<getTailleListeDesCessions(); i++) y_pos += 5;
            }
            if (temp[4].includes('Démission')) addText2(doc, x_pos, y_pos, demission());
            if (temp[4].includes('Nomination')) addText2(doc, x_pos, y_pos, nomination());
            if (temp[4].includes('Transfert du siège social')) addText2(doc, x_pos, y_pos, transfert());
            if (temp[4].includes('Changement')) addText2(doc, x_pos, y_pos, changement());
        }
        y_pos += 10;
    };

    switch (getNbResolution()){
        case 0: break;
        case 1: premiereResolution();
            break;
        case 2: premiereResolution();
            deuxiemeResolution();
            break;
        case 3: premiereResolution();
            deuxiemeResolution();
            troisiemeResolution();
            break;
        case 4: premiereResolution();
            deuxiemeResolution();
            troisiemeResolution();
            quatriemeResolution();
            break;
        case 5: premiereResolution();
            deuxiemeResolution();
            troisiemeResolution();
            quatriemeResolution();
            cinquiemeResolution();
            break;
        default: break;
    }

    var nouvelleRepartition = function(){
        addText(doc, x_pos, y_pos, "La nouvelle répartition des " + getTypeDividende() + " est la suivante :");
        y_pos += 5;

        var cess = calculerLesParts();
        for(var i=0; i < cess.length ; i++){
            addText(doc, x_pos, y_pos, cess[i].titreCessionnaire + " " + cess[i].nomCessionnaire);
            addText(doc, x_pos+90, y_pos, cess[i].parts + " " + getTypeDividende(), {align: 'right'});
            y_pos += 5;
        }
    };

    if($('#select_objet_acte').val().indexOf('Transfert des parts sociales') >= 0 || $('#select_objet_acte').val().indexOf('Transfert des actions') >= 0)
    {
        nouvelleRepartition();
    }

    var typeSignataire = '';
    if ($('#select_objet_acte').val().indexOf("Nomination d'un administrateur") >= 0) typeSignataire = 'Administrateur';
    if ($('#select_objet_acte').val().indexOf("Nomination d'un gérant") >= 0) typeSignataire = 'Gérant';

    y_pos += 10;
    addText(doc, x_pos+5, y_pos, typeSignataire);
    y_pos += 5;
    var nom = document.getElementById('nom_new').value.toUpperCase() + " " + (document.getElementById('prenom_new').value.charAt(0).toUpperCase() + document.getElementById('prenom_new').value).substring(1);
    addText(doc, x_pos, y_pos, nom);

    doc.setFontSize(11);
    doc.setFontType("bold");
}

function setPage3Inputs(doc, data){
    var soussigne = data[11];
    var soussigneP = data[12];
    var agissant_comme = data[13];
    var fait_a = data[14];
    var date = data[15];

    var x_pos = 77;
    var y_pos = 249.5;

    var longueur = soussigne + " " + soussigneP;

    if (longueur.length > 15){
        doc.setFontSize(9);
        doc.setFontType("bold");
        addText(doc, x_pos, y_pos-0.3, soussigne + " " + soussigneP);
    }
    else{
        doc.setFontSize(11);
        doc.setFontType("bold");
        addText(doc, x_pos, y_pos, soussigne + " " + soussigneP);
    }



    doc.setFontSize(11);
    doc.setFontType("bold");
    x_pos += 70;
    y_pos -= 0.2;
    addText(doc, x_pos, y_pos, agissant_comme);

    x_pos -= 69.5;
    y_pos += 12.4;
    addText(doc, x_pos, y_pos, fait_a);

    x_pos += 50;
    y_pos -= 0.1;
    addText(doc, x_pos, y_pos, date);
}

function setPage4Inputs(doc, data){
    var numero_entreprise = data[0];
    var nom = data[1];
    var forme_legale = data[2];
    var rue = data[3];
    var numero_rue = data[4];
    var boite = data[5];
    var code_postal = data[6];
    var localite = data[7];
    var pays = data[8];
    var objet_acte = data[9];
    var forme_legale_new = data[16];
    var rue_new = data[17];
    var numero_new = data[18];
    var boite_new = data[19];
    var code_postal_new = data[20];
    var localite_new = data[21];
    var pays_new = data[22];

    var x_pos = 96;
    var y_pos = 76.5;

    doc.setFontSize(11);
    doc.setFontType("bold");
    addText(doc, x_pos, y_pos, numero_entreprise);

    x_pos -= 10;
    y_pos += 13.7;
    addText(doc, x_pos, y_pos, nom);

    y_pos += 38.6;
    if (objet_acte !== "" && objet_acte !== null){
        if(objet_acte.indexOf('Changement de forme légale') >= 0){
            addText(doc, x_pos, y_pos, forme_legale_new);
        }
    }

    y_pos += 13;
    if (objet_acte !== "" && objet_acte !== null){
        if (objet_acte.indexOf('Transfert du siège social') >= 0){
            addText(doc, x_pos, y_pos, rue_new);

            y_pos += 6;
            addText(doc, x_pos, y_pos, numero_new);

            x_pos += 34;
            addText(doc, x_pos, y_pos, boite_new);

            x_pos -= 34;
            y_pos += 6;
            addText(doc, x_pos, y_pos, code_postal_new);

            x_pos += 34;
            addText(doc, x_pos, y_pos, localite_new);

            x_pos -= 34;
            y_pos += 6;
            addText(doc, x_pos, y_pos, pays_new);
        }
    }
}

function setPage5Inputs(doc, data){
    var soussigne = data[11];
    var soussigneP = data[12];
    var agissant_comme = data[13];
    var fait_a = data[14];
    var date = data[15];

    var x_pos = 15.5;
    var y_pos = 132;
    doc.setFontSize(10);
    doc.setFontType("normal");

    var liste = $('#select_objet_acte').val();

    if(liste.indexOf('Nomination d\'un gérant') >= 0 || liste.indexOf('Nomination d\'un administrateur') >= 0){
        doc.setFillColor(255,255,255);
        doc.rect(x_pos-5, y_pos-5, 20, 10, 'F');
        var n_registre_national = document.getElementById('registre_national_nouveau').value;
        var n_nom_prenom = document.getElementById('nom_new').value.toUpperCase() + " " + (document.getElementById('prenom_new').value).charAt(0).toUpperCase() + (document.getElementById('prenom_new').value).substring(1);
        var n_qualite = getTypeOfPerson();
        var n_date = document.getElementById('date').value;

        addText(doc, x_pos, y_pos, "N");
        addText(doc, (x_pos+10), y_pos, n_registre_national);
        addText(doc, (x_pos+50), y_pos, n_nom_prenom);
        addText(doc, (x_pos+134), y_pos, n_qualite);
        addText(doc, (x_pos+164), y_pos, n_date);

        y_pos += 5;
    }

    if(liste.indexOf('Démission d\'un gérant') >= 0 || liste.indexOf('Démission d\'un administrateur') >= 0){
        var c_registre_national = document.getElementById('registre_national_ancien').value;
        var c_nom_prenom = document.getElementById('nom_ancien').value.toUpperCase() + " " + (document.getElementById('prenom_ancien').value).charAt(0).toUpperCase() + (document.getElementById('prenom_ancien').value).substring(1);
        var c_qualite = getTypeOfPerson();
        var c_date = document.getElementById('date').value;
        addText(doc, x_pos, y_pos, "C");
        addText(doc, (x_pos+10), y_pos, c_registre_national);
        addText(doc, (x_pos+50), y_pos, c_nom_prenom);
        addText(doc, (x_pos+134), y_pos, c_qualite);
        addText(doc, (x_pos+164), y_pos, c_date);

    }

    x_pos = 75;
    y_pos = 233;

    doc.setFontSize(11);
    doc.setFontType("bold");
    var longueur = soussigne + " " + soussigneP;

    if (longueur.length > 15){
        doc.setFontSize(9);
        doc.setFontType("bold");
        addText(doc, x_pos, y_pos-0.3, soussigne + " " + soussigneP);
    }
    else{
        doc.setFontSize(11);
        doc.setFontType("bold");
        addText(doc, x_pos, y_pos, soussigne + " " + soussigneP);
    }

    doc.setFontSize(11);
    doc.setFontType("bold");
    x_pos += 70;
    y_pos -= 0.2;
    addText(doc, x_pos, y_pos, agissant_comme);

    x_pos -= 78;
    y_pos += 12.8;
    addText(doc, x_pos, y_pos, fait_a);

    x_pos += 50;
    addText(doc, x_pos, y_pos, date);
}

function Unite( nombre ){
    var unite;
    switch( nombre ){
        case 0: unite = "zéro";		break;
        case 1: unite = "un";		break;
        case 2: unite = "deux";		break;
        case 3: unite = "trois"; 	break;
        case 4: unite = "quatre"; 	break;
        case 5: unite = "cinq"; 	break;
        case 6: unite = "six"; 		break;
        case 7: unite = "sept"; 	break;
        case 8: unite = "huit"; 	break;
        case 9: unite = "neuf"; 	break;
    }//fin switch
    return unite;
}//-----------------------------------------------------------------------

function Dizaine( nombre ){
    switch( nombre ){
        case 10: dizaine = "dix"; break;
        case 11: dizaine = "onze"; break;
        case 12: dizaine = "douze"; break;
        case 13: dizaine = "treize"; break;
        case 14: dizaine = "quatorze"; break;
        case 15: dizaine = "quinze"; break;
        case 16: dizaine = "seize"; break;
        case 17: dizaine = "dix-sept"; break;
        case 18: dizaine = "dix-huit"; break;
        case 19: dizaine = "dix-neuf"; break;
        case 20: dizaine = "vingt"; break;
        case 30: dizaine = "trente"; break;
        case 40: dizaine = "quarante"; break;
        case 50: dizaine = "cinquante"; break;
        case 60: dizaine = "soixante"; break;
        case 70: dizaine = "soixante-dix"; break;
        case 80: dizaine = "quatre-vingt"; break;
        case 90: dizaine = "quatre-vingt-dix"; break;
    }//fin switch
    return dizaine;
}//-----------------------------------------------------------------------

function NumberToLetter( nombre ){
    var i, j, n, quotient, reste, nb ;
    var ch
    var numberToLetter='';
    //__________________________________

    if(  nombre.toString().replace( / /gi, "" ).length > 15  )	return "dépassement de capacité";
    if(  isNaN(nombre.toString().replace( / /gi, "" ))  )		return "Nombre non valide";

    nb = parseFloat(nombre.toString().replace( / /gi, "" ));
    if(  Math.ceil(nb) != nb  )	return  "Nombre avec virgule non géré.";

    n = nb.toString().length;
    switch( n ){
        case 1: numberToLetter = Unite(nb); break;
        case 2: if(  nb > 19  ){
            quotient = Math.floor(nb / 10);
            reste = nb % 10;
            if(  nb < 71 || (nb > 79 && nb < 91)  ){
                if(  reste == 0  ) numberToLetter = Dizaine(quotient * 10);
                if(  reste == 1  ) numberToLetter = Dizaine(quotient * 10) + "-et-" + Unite(reste);
                if(  reste > 1   ) numberToLetter = Dizaine(quotient * 10) + "-" + Unite(reste);
            }else numberToLetter = Dizaine((quotient - 1) * 10) + "-" + Dizaine(10 + reste);
        }else numberToLetter = Dizaine(nb);
            break;
        case 3: quotient = Math.floor(nb / 100);
            reste = nb % 100;
            if(  quotient == 1 && reste == 0   ) numberToLetter = "cent";
            if(  quotient == 1 && reste != 0   ) numberToLetter = "cent" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste == 0    ) numberToLetter = Unite(quotient) + " cents";
            if(  quotient > 1 && reste != 0    ) numberToLetter = Unite(quotient) + " cent " + NumberToLetter(reste);
            break;
        case 4 :  quotient = Math.floor(nb / 1000);
            reste = nb - quotient * 1000;
            if(  quotient == 1 && reste == 0   ) numberToLetter = "mille";
            if(  quotient == 1 && reste != 0   ) numberToLetter = "mille" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste == 0    ) numberToLetter = NumberToLetter(quotient) + " mille";
            if(  quotient > 1 && reste != 0    ) numberToLetter = NumberToLetter(quotient) + " mille " + NumberToLetter(reste);
            break;
        case 5 :  quotient = Math.floor(nb / 1000);
            reste = nb - quotient * 1000;
            if(  quotient == 1 && reste == 0   ) numberToLetter = "mille";
            if(  quotient == 1 && reste != 0   ) numberToLetter = "mille" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste == 0    ) numberToLetter = NumberToLetter(quotient) + " mille";
            if(  quotient > 1 && reste != 0    ) numberToLetter = NumberToLetter(quotient) + " mille " + NumberToLetter(reste);
            break;
        case 6 :  quotient = Math.floor(nb / 1000);
            reste = nb - quotient * 1000;
            if(  quotient == 1 && reste == 0   ) numberToLetter = "mille";
            if(  quotient == 1 && reste != 0   ) numberToLetter = "mille" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste == 0    ) numberToLetter = NumberToLetter(quotient) + " mille";
            if(  quotient > 1 && reste != 0    ) numberToLetter = NumberToLetter(quotient) + " mille " + NumberToLetter(reste);
            break;
        case 7: quotient = Math.floor(nb / 1000000);
            reste = nb % 1000000;
            if(  quotient == 1 && reste == 0  ) numberToLetter = "un million";
            if(  quotient == 1 && reste != 0  ) numberToLetter = "un million" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste == 0   ) numberToLetter = NumberToLetter(quotient) + " millions";
            if(  quotient > 1 && reste != 0   ) numberToLetter = NumberToLetter(quotient) + " millions " + NumberToLetter(reste);
            break;
        case 8: quotient = Math.floor(nb / 1000000);
            reste = nb % 1000000;
            if(  quotient == 1 && reste == 0  ) numberToLetter = "un million";
            if(  quotient == 1 && reste != 0  ) numberToLetter = "un million" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste == 0   ) numberToLetter = NumberToLetter(quotient) + " millions";
            if(  quotient > 1 && reste != 0   ) numberToLetter = NumberToLetter(quotient) + " millions " + NumberToLetter(reste);
            break;
        case 9: quotient = Math.floor(nb / 1000000);
            reste = nb % 1000000;
            if(  quotient == 1 && reste == 0  ) numberToLetter = "un million";
            if(  quotient == 1 && reste != 0  ) numberToLetter = "un million" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste == 0   ) numberToLetter = NumberToLetter(quotient) + " millions";
            if(  quotient > 1 && reste != 0   ) numberToLetter = NumberToLetter(quotient) + " millions " + NumberToLetter(reste);
            break;
        case 10: quotient = Math.floor(nb / 1000000000);
            reste = nb - quotient * 1000000000;
            if(  quotient == 1 && reste == 0  ) numberToLetter = "un milliard";
            if(  quotient == 1 && reste != 0  ) numberToLetter = "un milliard" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste == 0   ) numberToLetter = NumberToLetter(quotient) + " milliards";
            if(  quotient > 1 && reste != 0   ) numberToLetter = NumberToLetter(quotient) + " milliards " + NumberToLetter(reste);
            break;
        case 11: quotient = Math.floor(nb / 1000000000);
            reste = nb - quotient * 1000000000;
            if(  quotient == 1 && reste == 0  ) numberToLetter = "un milliard";
            if(  quotient == 1 && reste != 0  ) numberToLetter = "un milliard" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste == 0   ) numberToLetter = NumberToLetter(quotient) + " milliards";
            if(  quotient > 1 && reste != 0   ) numberToLetter = NumberToLetter(quotient) + " milliards " + NumberToLetter(reste);
            break;
        case 12: quotient = Math.floor(nb / 1000000000);
            reste = nb - quotient * 1000000000;
            if(  quotient == 1 && reste == 0  ) numberToLetter = "un milliard";
            if(  quotient == 1 && reste != 0  ) numberToLetter = "un milliard" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste == 0   ) numberToLetter = NumberToLetter(quotient) + " milliards";
            if(  quotient > 1 && reste != 0   ) numberToLetter = NumberToLetter(quotient) + " milliards " + NumberToLetter(reste);
            break;
        case 13: quotient = Math.floor(nb / 1000000000000);
            reste = nb - quotient * 1000000000000;
            if(  quotient == 1 && reste == 0  ) numberToLetter = "un billion";
            if(  quotient == 1 && reste != 0  ) numberToLetter = "un billion" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste == 0   ) numberToLetter = NumberToLetter(quotient) + " billions";
            if(  quotient > 1 && reste != 0   ) numberToLetter = NumberToLetter(quotient) + " billions " + NumberToLetter(reste);
            break;
        case 14: quotient = Math.floor(nb / 1000000000000);
            reste = nb - quotient * 1000000000000;
            if(  quotient == 1 && reste == 0  ) numberToLetter = "un billion";
            if(  quotient == 1 && reste != 0  ) numberToLetter = "un billion" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste == 0   ) numberToLetter = NumberToLetter(quotient) + " billions";
            if(  quotient > 1 && reste != 0   ) numberToLetter = NumberToLetter(quotient) + " billions " + NumberToLetter(reste);
            break;
        case 15: quotient = Math.floor(nb / 1000000000000);
            reste = nb - quotient * 1000000000000;
            if(  quotient == 1 && reste == 0  ) numberToLetter = "un billion";
            if(  quotient == 1 && reste != 0  ) numberToLetter = "un billion" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste == 0   ) numberToLetter = NumberToLetter(quotient) + " billions";
            if(  quotient > 1 && reste != 0   ) numberToLetter = NumberToLetter(quotient) + " billions " + NumberToLetter(reste);
            break;
    }//fin switch
    /*respect de l'accord de quatre-vingt*/
    if(  numberToLetter.substr(numberToLetter.length-"quatre-vingt".length,"quatre-vingt".length) == "quatre-vingt"  ) numberToLetter = numberToLetter + "s";

    return numberToLetter;
}

function trouverLeMois(m){

    m = Number.parseFloat(m);
    var mois = [];
    mois[0] = "janvier";
    mois[1] = "février";
    mois[2] = "mars";
    mois[3] = "avril";
    mois[4] = "mai";
    mois[5] = "juin";
    mois[6] = "juillet";
    mois[7] = "août";
    mois[8] = "septembre";
    mois[9] = "octobre";
    mois[10] = "novembre";
    mois[11] = "décembre";
    return mois[m-1];
}

function addText(doc, x_pos, y_pos, texte){
    doc.text(texte, x_pos, y_pos, {maxWidth: 160, align: "justify"});
}

function addText2(doc, x_pos, y_pos, texte){
    doc.text(texte, x_pos, y_pos, {maxWidth: 150, align: "justify"});
}

function textePresence(){
    var liste = document.getElementById('div_nb');

    if (liste.childElementCount > 0) {
        var masculin = 0;
        var feminin = 0;
        for (var i = 0; i < liste.childElementCount; i++)
        {
            var id = liste.getElementsByTagName('div')[0].id;
            id = id.substring(5);
            var id_ancien = document.getElementsByName('nb_'+ id +'_T');
            if (id_ancien[0].checked)
            {
                var id_sexe = document.getElementsByName('nb_' + id + '_S');
                if (id_sexe[0].checked) masculin++;
                if (id_sexe[1].checked) feminin++;
            }
        }

        if (masculin === 1 && feminin === 0) return "EST PRESENT";
        if (masculin === 1) return "SONT PRESENTS";
        if (masculin > 1) return "SONT PRESENTS";
        if (feminin === 1 && masculin === 0) return "EST PRESENTE";
        if (feminin > 1 && masculin === 0) return "SONT PRESENTES";
        }
    return "";
}

function getPresident(liste){

    if (liste.childElementCount > 0){
        for (var i=0; i < liste.childElementCount ; i++){
            var id = liste.getElementsByTagName('div')[0].id;
            id = id.substring(5);
            var nom = (document.getElementById('nb_' + id + '_N').value).toUpperCase();
            var prenom = (document.getElementById('nb_' + id + '_P').value).charAt(0).toUpperCase() + (document.getElementById('nb_' + id + '_P').value).substring(1);
            var id_sexe = document.getElementsByName('nb_'+id+'_S');
            var sexe ="";

            if (id_sexe[0].checked) sexe = id_sexe[0].value;
            if (id_sexe[1].checked) sexe = id_sexe[1].value;
            var presChecked = document.getElementsByName('president');
            if (presChecked[i].checked) return sexe + " " + nom + " " + prenom;
        }
    }
    return "";
}

function getNbResolution(){
    if ($('#select_objet_acte').val() !== "" && $('#select_objet_acte').val() !== null){
        return $('#select_objet_acte').val().length;
    }
    return 0;
}

function getTypeDividende(){
    var asso_actioListe = document.getElementsByName('asso_actio');
    if (asso_actioListe[0].checked) return "parts sociales";
    if (asso_actioListe[1].checked) return "actions";
    return "";
}

function getReuni(liste){
    if (liste.length > 1){
        return "réunissent";
    }
    return "réunit";
}

function cession(){
    var resultat = "";

    var listeDesCessions = getListeDesCessions();

    for (var k = 0; k < listeDesCessions.length ; k++){
        resultat += listeDesCessions[k].titre + " " + listeDesCessions[k].nomCedant + " cède ses " + listeDesCessions[k].parts + " " + getTypeDividende() + " à " + listeDesCessions[k].titreCessionnaire + " " + listeDesCessions[k].nomCessionnaire + " qui accepte.";
        resultat += "\n";
    }
    return resultat;
}

function demission(){
    var nom = document.getElementById('nom_ancien').value;
    var prenom = document.getElementById('prenom_ancien').value;
    var sexe = "";
    var sexeListe = document.getElementsByName('sexe_gerant_ancien');
    if (sexeListe[0].checked) sexe = "Monsieur";
    if (sexeListe[1].checked) sexe = "Madame";

    var personne = sexe + " " + nom.toUpperCase() + " " + (prenom.charAt(0).toUpperCase() + prenom.substring(1));

    var asso_actioListe = document.getElementsByName('asso_actio');
    if (asso_actioListe[0].checked) return personne + " démissionne de son poste de gérant. Décharge-lui est donnée quant à la durée de son mandat.";
    if (asso_actioListe[1].checked) return personne + " démissionne de son poste d'administrateur. Décharge-lui est donnée quant à la durée de son mandat.";
}

function nomination(){
    var nom = document.getElementById('nom_new').value;
    var prenom = document.getElementById('prenom_new').value;
    var sexe = "";
    var sexeListe = document.getElementsByName('sexe_gerant_new');
    if (sexeListe[0].checked) sexe = "Monsieur";
    if (sexeListe[1].checked) sexe = "Madame";

    var personne = sexe + " " + nom.toUpperCase() + " " + (prenom.charAt(0).toUpperCase() + prenom.substring(1));

    var rue = document.getElementById('rue_new_gerant').value;
    var numero = document.getElementById('numero_new_gerant').value;
    var boite = "Bte " + document.getElementById('boite_new_gerant').value;
    var code_postal = document.getElementById('code_postal_new_gerant').value;
    var localite = document.getElementById('localite_new_gerant').value;
    var pays =  document.getElementById('pays_new_gerant').value;

    if(document.getElementById('boite_new_gerant').value === "" || document.getElementById('boite_new_gerant').value === null) boite = "";

    var adresse = rue + " " + numero + " " + boite + " - " + code_postal + " " + localite;

    var asso_actioListe = document.getElementsByName('asso_actio');
    if (asso_actioListe[0].checked) return personne + " domicilié à " + adresse + " est nommé gérant pour une durée indéterminée.";
    if (asso_actioListe[1].checked) return personne + " domicilié à " + adresse + " est nommé administrateur pour une durée indéterminée.";
}

function changement(){
    var forme_legale = "";
    if ($('#select_forme_legale').val() !== "" && $('#select_forme_legale').val() !== null){
        forme_legale = $('#select_forme_legale').val().toLowerCase();
    }

    var forme_legale_new = "";
    if ($('#select_forme_legale_new').val() !== "" && $('#select_forme_legale_new').val() !== null){
        forme_legale_new = $('#select_forme_legale_new').val().toLowerCase();
    }
    return "La forme légale passe de "+ forme_legale +" à "+ forme_legale_new +" à dater de ce jour.";
}

function transfert(){
    var rue_new = document.getElementById('rue_new').value;
    var numero_new = document.getElementById('numero_new').value;
    var boite_new = "Bte " + document.getElementById('boite_new').value;
    var code_postal_new = document.getElementById('code_postal_new').value;
    var localite_new = document.getElementById('localite_new').value;
    var pays_new = document.getElementById('pays_new').value;

    if(document.getElementById('boite_new').value === "" || document.getElementById('boite_new').value === null) boite_new = "";

    var nouvelleAdresse = rue_new + " "  + numero_new + " " + boite_new + " - " + code_postal_new + " " + localite_new;
    return "Le siège social est transféré à dater de ce jour à " + nouvelleAdresse + ".";
}

function getTailleListeDesCessions(){
    var div = document.getElementById('div_nb');
    var taille = 0;

    if (div.childElementCount > 0) {
        var listeDesCessions = [];
        for (var i = 0; i < div.childElementCount; i++) {
            var id = div.getElementsByTagName('div')[0].id;
            id = id.substring(5);
            var divSecond = document.getElementById('nb_'+id+'_Cession');
            if (divSecond.childElementCount > 0){
                for (var j =0; j < divSecond.childElementCount; j++){
                    taille++;
                }
            }
        }
        return taille;
    }
    return 0;
}

function signer(doc, x_pos, y_pos){

    var listeDesSignataires = getListeDesCessionnaires();

    if (document.getElementById('nom_new').value !== '' && document.getElementById('nom_new').value !== null) {
        var nomN = document.getElementById('nom_new').value.toUpperCase() + " " + (document.getElementById('prenom_new').value.charAt(0).toUpperCase() + document.getElementById('prenom_new').value).substring(1);
        var objet = {
            nomCessionnaire: nomN
        };
        listeDesSignataires.push(objet);
    }

    var align = "gauche";
    for (var i=0; i < listeDesSignataires.length; i++){
        if (i === 2 && listeDesSignataires.length === 3){
            doc.text(x_pos+65, y_pos, listeDesSignataires[i].nomCessionnaire);
            break;
        }
        if (i === 4 && listeDesSignataires.length === 5){
            doc.text(x_pos+65, y_pos, listeDesSignataires[i].nomCessionnaire);
            break;
        }

        if (align === "gauche"){
            doc.text(x_pos, y_pos, listeDesSignataires[i].nomCessionnaire);
            align = "droite";
            x_pos += 150;
        }
        else{
            doc.text(x_pos, y_pos, listeDesSignataires[i].nomCessionnaire, {align: 'right'});
            align = "gauche";
            x_pos -= 150;
            y_pos += 25;
        }
    }
}

function getListeDesCessions() {
    var div = document.getElementById('div_nb');

    if (div.childElementCount > 0) {
        var listeDesCessions = [];
        for (var i = 0; i < div.childElementCount; i++) {
            var id = div.getElementsByTagName('div')[0].id;
            id = id.substring(5);

            var choix_sexe = document.getElementsByName('nb_' + id + '_S');
            var sexe = "";
            if (choix_sexe[0].checked) sexe = choix_sexe[0].value;
            if (choix_sexe[1].checked) sexe = choix_sexe[1].value;

            var cessions = document.getElementById('cess_de_'+id);

            if (cessions.childNodes.length > 0) {
                var titreCedant = sexe;
                var nom = (document.getElementById('nb_' + id + "_N").value).toUpperCase() + " " + ((document.getElementById('nb_' + id + "_P").value).charAt(0).toUpperCase() + (document.getElementById('nb_' + id + "_P").value).substring(1));

                // for (var j = 0; j < cessions.childNodes.length; j++) {
                //     var temp = 'cession_'+id+'_de_'+j;
                //     var tempReplaced = temp.replace(id.toString(), '');
                //     var idJ = tempReplaced.substring(12);
                //     console.log('idJ : ' + idJ);
                //     console.log('sexe_cession_'+idJ+'_de_'+id);
                //
                //     var choix_sexe_cession = document.getElementsByName('sexe_cession_'+idJ+'_de_'+id);
                //     var s = "";
                //     if (choix_sexe_cession[0].checked) s = choix_sexe[0].value;
                //     if (choix_sexe_cession[1].checked) s = choix_sexe[1].value;
                //
                //     listeDesCessions.push({
                //         titre: titreCedant,
                //         nomCedant: nom,
                //         parts: cessions.childNodes[j].childNodes[3].childNodes[0].value,
                //         titreCessionnaire: s,
                //         nomCessionnaire: cessions.childNodes[j].childNodes[0].childNodes[0].value.toUpperCase() + " " + (cessions.childNodes[j].childNodes[1].childNodes[0].value.charAt(0).toUpperCase() + cessions.childNodes[j].childNodes[1].childNodes[0].value.substring(1))
                //     });
                // }

                for (var j = 0; j < cessions.childNodes.length; j++) {
                    var choix_sexe_cession = document.getElementsByName('sexe_cession_'+j+'_de_'+id);
                    var s = "";
                    if (choix_sexe_cession[0].checked) s = choix_sexe[0].value;
                    if (choix_sexe_cession[1].checked) s = choix_sexe[1].value;

                    listeDesCessions.push({
                        titre: titreCedant,
                        nomCedant: nom,
                        parts: cessions.childNodes[j].childNodes[3].childNodes[0].value,
                        titreCessionnaire: s,
                        nomCessionnaire: cessions.childNodes[j].childNodes[0].childNodes[0].value.toUpperCase() + " " + (cessions.childNodes[j].childNodes[1].childNodes[0].value.charAt(0).toUpperCase() + cessions.childNodes[j].childNodes[1].childNodes[0].value.substring(1))
                    });
                }
            }
        }
        return listeDesCessions;
    }
    return "";
}

function calculerLesParts(){
    var listeDepart = getListeDesCessions();
    var listeParent = getListeDesCessionnairesSansParts();
    var listeResultat = [];

    for (var i=0; i < listeDepart.length-1; i++){
        for (var j=i+1; j < listeDepart.length; j++){
            if (listeDepart[j].nomCessionnaire === listeDepart[i].nomCessionnaire){
                var parts = parseInt(listeDepart[i].parts);
                parts += parseInt(listeDepart[j].parts);
                listeDepart[i].parts = parts;

                listeDepart[j].nomCessionnaire = "";
                listeDepart[j].parts = 0;
            }
        }
    }

    for (var i=0; i < listeDepart.length; i++){
        if (listeDepart[i].nomCessionnaire !== "") listeResultat.push(listeDepart[i]);
    }

    for (var i=0; i < listeParent.length; i++){
        listeResultat.push(listeParent[i]);
    }
    return listeResultat;
}

function getDateLettrer(){
    var date = document.getElementById('date').value;
    var asso_actioListe = document.getElementsByName('asso_actio');
    var asso_actio = "";
    if (asso_actioListe[0].checked) asso_actio = asso_actioListe[0].value;
    if (asso_actioListe[1].checked) asso_actio = asso_actioListe[1].value;
    return "L'an " + NumberToLetter(date.substring(6)) + ", le" + " " + date.slice(0, -8) + " " + trouverLeMois(date.slice(3, -5)) + " " + "à 18 heures s'est réuni ainsi qu'il suit, l'assemblée générale extraordinaire des" + " " + asso_actio + ".";
}

function getListeDesCessionnaires(){
    var listeDesPersonnes = [];
    var liste = document.getElementById('div_nb');
    if (liste.childNodes.length > 0){
        for (var i=0; i < liste.childNodes.length ; i++){
            var id = document.getElementById('div_nb').childNodes[i].id;
            id = id.substring(5);
            var n = document.getElementById('nb_' + id + "_N").value.toUpperCase();
            var p = document.getElementById('nb_' + id + "_P").value.charAt(0).toUpperCase() + document.getElementById('nb_' + id + "_P").value.substring(1);
            var id_parts = 'nb_' + id + "_TotParts";
            var id_sexe = document.getElementsByName('nb_'+id+'_S');
            var sexe = "";
            if (id_sexe[0].checked) sexe = id_sexe[0].value;
            if (id_sexe[1].checked) sexe = id_sexe[1].value;
            var id_type = document.getElementsByName('nb_'+ id + '_T');
            var type = '';
            if (id_type[0].checked) type = 'Ancien';
            if (id_type[1].checked) type = 'Nouveau';

            var personne = {
                type: type,
                titreCessionnaire: sexe,
                nomCessionnaire: n + " " + p,
                parts: document.getElementById(id_parts).value
            };
            listeDesPersonnes.push(personne);
        }
    }
    return listeDesPersonnes;
}

function getListeDesCessionnairesSansParts(){
    var listeDesPersonnes = [];
    var liste = document.getElementById('div_nb');
    if (liste.childNodes.length > 0){
        for (var i=0; i < liste.childNodes.length ; i++){
            var id = document.getElementById('div_nb').childNodes[i].id;
            id = id.substring(5);
            var n = document.getElementById('nb_' + id + "_N").value.toUpperCase();
            var p = document.getElementById('nb_' + id + "_P").value.charAt(0).toUpperCase() + document.getElementById('nb_' + id + "_P").value.substring(1);
            var id_parts = 'nb_' + id + "_TotParts";
            var id_sexe = document.getElementsByName('nb_'+id+'_S');
            var sexe = "";
            if (id_sexe[0].checked) sexe = id_sexe[0].value;
            if (id_sexe[1].checked) sexe = id_sexe[1].value;

            var personne = {
                titreCessionnaire: sexe,
                nomCessionnaire: n + " " + p,
                parts: document.getElementById(id_parts).value
            };

            var cessions = document.getElementById('cess_de_'+id);
            if (cessions.childNodes.length > 0) {
                    for (var j = 0; j < cessions.childNodes.length; j++) {
                        var enfant = {
                            parts: cessions.childNodes[0].childNodes[3].childNodes[0].value,
                        };
                        var personnePart = parseInt(personne.parts);
                        var enfantPart = parseInt(enfant.parts);
                        personne.parts = (personnePart - enfantPart);
                    }
                }
            if (personne.parts !== '0' && personne.parts !== 0) listeDesPersonnes.push(personne);
        }
    }
    return listeDesPersonnes;
}