function generateAG(save_to_device) {
    triggerFullScreenPreloader();

    let doc = new jsPDF();
    let data = getFormulaire1Inputs();

    setPage1AG(doc, data, 25, 34);
    doc.addPage();
    setPage2AG(doc, data, 25, 34);

    if (save_to_device) {
        let nom_document = "ASSEMBLEE_GENERALE.pdf";
        doc.save(nom_document);
        triggerFullScreenPreloader();
    }
    else {
        window.open(doc.output('bloburl'));
        triggerFullScreenPreloader();
    }
}

function setPage1AG(doc, data, x_pos, y_pos){

    var numero_entreprise = data[0];
    var nom = data[1];
    var forme_legale = data[2];
    var rue = data[3];
    var numero_rue = data[4];
    var boite = data[5];
    var code_postal = data[6];
    var localite = data[7];
    var pays = data[8];

    if (boite !== "") boite = "Bus " + boite;

    var texte = data[10];
    var soussigne = data[11];
    var soussigneP = data[12];
    var agissant_comme = data[13];
    var fait_a = data[14];
    var date = data[15];
    var forme_legale_new = data[16];
    var rue_new = data[17];
    var numero_new = data[18];
    var boite_new = data[19];
    var code_postal_new = data[20];
    var localite_new = data[21];
    var pays_new = data[22];

    var asso_actio = getTypeOfPersons();

    var personnesArray = [];
    var personnesArraySansSexe = [];
    var anciens = [];
    var nouveaux = [];

    var liste = document.getElementById('div_nb');
    if (liste.childNodes.length > 0){

        for (var i=0; i < liste.childNodes.length ; i++){
            var id = liste.getElementsByTagName('div')[0].id;
            id = id.substring(5);
            var id_nom = 'nb_' + id + "_N";
            var id_prenom = 'nb_' + id + "_P";
            var id_sexe = document.getElementsByName('nb_'+id+'_S');
            var sexe = "";
            if (id_sexe[0].checked) sexe = id_sexe[0].value;
            if (id_sexe[1].checked) sexe = id_sexe[1].value;
            personnesArray[i] = sexe + " " + (document.getElementById(id_nom).value).toUpperCase() + " " + ((document.getElementById(id_prenom).value).charAt(0).toUpperCase() + (document.getElementById(id_prenom).value).substring(1));
            personnesArraySansSexe[i] = (document.getElementById(id_nom).value).toUpperCase() + " " + ((document.getElementById(id_prenom).value).charAt(0).toUpperCase() + (document.getElementById(id_prenom).value).substring(1));
            var ancien = "";
            var id_type = document.getElementsByName('nb_'+id+'_T');
            // if (id_type[0].checked) anciens[i] = sexe + " " + (document.getElementById(id_nom).value).toUpperCase() + " " + ((document.getElementById(id_prenom).value).charAt(0).toUpperCase() + (document.getElementById(id_prenom).value).substring(1));
            // if (id_type[1].checked) nouveaux[i] = sexe + " " + (document.getElementById(id_nom).value).toUpperCase() + " " + ((document.getElementById(id_prenom).value).charAt(0).toUpperCase() + (document.getElementById(id_prenom).value).substring(1));
        }
    }

    var listage = getListeDesCessionnaires();
    if(listage.length > 0){
        for (var i=0; i < listage.length; i++){
            if (listage[i].type === 'Ancien') {
                anciens.push(listage[i].titreCessionnaire + " " + listage[i].nomCessionnaire) ;
            }
            if (listage[i].type === 'Nouveau')  {
                nouveaux.push(listage[i].titreCessionnaire + " " + listage[i].nomCessionnaire);
            }
        }
    }

    var objet_acte = [];
    if ($('#select_objet_acte').val() !== "" && $('#select_objet_acte').val() !== null){
        var objet_acte_length = $('#select_objet_acte').val().length;
        var temp = $('#select_objet_acte').val();
        for (var i=0; i < temp.length; i++){
            objet_acte[i] = "-    " + temp[i];
        }
    }

    doc.setFont('Times');
    doc.setFontSize(12);

    addText(doc, x_pos, y_pos, nom.toUpperCase());
    y_pos += 5;
    addText(doc, x_pos, y_pos, rue + " " + numero_rue + " " + boite);
    y_pos += 5;
    addText(doc, x_pos, y_pos, code_postal + " " + localite);
    y_pos += 5;
    addText(doc, x_pos, y_pos, "Ondernemingsnummer : " +  numero_entreprise);

    x_pos += 10;
    y_pos += 15;
    doc.setFontStyle('bold');
    addText(doc, x_pos, y_pos, "Notulen van de buitengewone algemene vergadering".toUpperCase());
    doc.setFillColor(0,0,0);
    doc.rect(x_pos, y_pos+0.5, 134, 0.5, 'F');

    doc.setFontStyle('normal');

    x_pos -= 10;
    y_pos += 10;
    addText(doc, x_pos, y_pos, getDateLettrer());

    y_pos += 15;
    addText(doc, x_pos, y_pos, textePresence() + " : ");

    y_pos += 10;
    addText(doc, x_pos, y_pos, anciens);
    y_pos += anciens.length * 5;

    y_pos += 5;
    // addText(doc, x_pos, y_pos, "qui " + getReuni(anciens) + " la totalité des " + getTypeDividende() + " représentatives du capital de la société.");

    y_pos += 10;
    addText(doc, x_pos, y_pos, "De vergadering wordt geopend onder het voorzitterschap van :");

    y_pos += 10;
    doc.setFontStyle('bold');
    addText(doc, x_pos, y_pos, getPresident(liste) + ".");
    doc.setFontStyle('normal');

    y_pos += 15;
    addText(doc, x_pos, y_pos, "De president verklaart vervolgens :");

    y_pos += 10;
    addText(doc, x_pos, y_pos, "1. Dat het doel van deze vergadering is om hier op de agenda te beraadslagen, herinnerd aan:");

    x_pos += 65;
    y_pos += 15;
    doc.setFontStyle('bold');
    addText(doc, x_pos, y_pos, "agenda".toUpperCase());
    doc.setFontStyle('normal');
    doc.setFillColor(0,0,0);
    doc.rect(x_pos, y_pos+0.5, 18, 0.2, 'F');

    x_pos -= 40;
    y_pos += 10;
    for (var i=0; i < objet_acte.length; i++){
        addText(doc, x_pos, y_pos, objet_acte[i]);
        y_pos += 5;
    }

    x_pos -= 25;
    y_pos += 10;
    addText(doc, x_pos, y_pos, "2. Dat alle " + asso_actio + " hebben ingestemd met ontmoeten en aanwezig zijn, dit moet niet worden gerechtvaardigd " +
        "van het verzenden van convocaties. Deze vergadering is daarom geldig bijeengeroepen en in staat om weloverwogen op de vastgestelde agenda.");

    y_pos += 30;
    // addText(doc, x_pos, y_pos, "L'assemblée prend ensuite à l'unanimité et chaque fois par un vote séparé, les résolutions suivantes :");

    x_pos += 125;
    y_pos += 20;
    // addText(doc, x_pos, y_pos, "Paraphes");
}

function setPage2AG(doc, data, x_pos, y_pos){

    doc.setFont('Times');
    doc.setFontSize(12);

    var numero_entreprise = data[0];
    var nom = data[1];
    var forme_legale = data[2];
    var rue = data[3];
    var numero_rue = data[4];
    var boite = data[5];
    var code_postal = data[6];
    var localite = data[7];
    var pays = data[8];

    if (boite !== "") boite = "Bus " + boite;

    var texte = data[10];
    var soussigne = data[11];
    var soussigneP = data[12];
    var agissant_comme = data[13];
    var fait_a = data[14];
    var date = data[15];
    var forme_legale_new = data[16];
    var rue_new = data[17];
    var numero_new = data[18];
    var boite_new = data[19];
    var code_postal_new = data[20];
    var localite_new = data[21];
    var pays_new = data[22];

    var asso_actio = getTypeOfPersons();

    var liste = document.getElementById('div_nb');
    var listeDesPersonnes = [];
    var listeDesConcessionnaires = [];
    var listeDesNouveauxGerants = [];

    if (liste.childElementCount > 0){
        for (var i=0; i < liste.childElementCount ; i++){
            var id = liste.getElementsByTagName('div')[0].id;
            id = id.substring(5);
            var choix_sexe = document.getElementsByName('nb_'+id+'_S');
            var sexe ="";
            if (choix_sexe[0].checked) sexe = choix_sexe[0].value;
            if (choix_sexe[1].checked) sexe = choix_sexe[1].value;

            listeDesPersonnes.push({
                titre: sexe,
                nom:  (document.getElementById('nb_' + id + "_N").value).toUpperCase() + " " + ((document.getElementById('nb_' + id + "_P").value).charAt(0).toUpperCase() + (document.getElementById('nb_' + id + "_P").value).substring(1)),
                // parts:  document.getElementById('nb_'+id+'_Parts').value
            });

            var type = document.getElementsByName('nb_'+id+'_T');
            if (type[0].checked) {
                listeDesConcessionnaires.push(
                    {
                        titre: sexe,
                        nom: (document.getElementById('nb_' + id + "_N").value).toUpperCase() + " " + ((document.getElementById('nb_' + id + "_P").value).charAt(0).toUpperCase() + (document.getElementById('nb_' + id + "_P").value).substring(1)),
                        // parts: document.getElementById('nb_'+id+'_Parts').value
                    });
            }
            if (type[1].checked){
                listeDesNouveauxGerants.push(
                    {
                        titre: sexe,
                        nom: (document.getElementById('nb_' + id + "_N").value).toUpperCase() + " " + ((document.getElementById('nb_' + id + "_P").value).charAt(0).toUpperCase() + (document.getElementById('nb_' + id + "_P").value).substring(1)),
                        // parts: document.getElementById('nb_'+id+'_Parts').value
                    });
            }
        }
    }

    var objet_acte = "";
    if ($('#select_objet_acte').val() !== "" && $('#select_objet_acte').val() !== null){
        var temp = $('#select_objet_acte').val();
        for (var i=0; i < temp.length; i++){
            objet_acte += "-    " + temp[i] + "\n";
        }
    }

    addText(doc, x_pos, y_pos, nom.toUpperCase());
    y_pos += 5;
    addText(doc, x_pos, y_pos, rue + " " + numero_rue + " " + boite);
    y_pos += 5;
    addText(doc, x_pos, y_pos, code_postal + " " + localite);
    y_pos += 5;
    addText(doc, x_pos, y_pos, "Ondernemingsnummer : " +  numero_entreprise);

    var souligner = true;
    y_pos += 25;

    let premiereResolution = function () {
        addText(doc, x_pos, y_pos, "eerste resolutie".toUpperCase());
        if (souligner) {
            doc.setFillColor(0, 0, 0);
            doc.rect(x_pos, y_pos + 0.5, 40, 0.2, 'F');
        }

        y_pos += 10;
        if ($('#select_objet_acte').val().length > 0 && $('#select_objet_acte').val() !== null) {
            var temp = $('#select_objet_acte').val();
            if (temp[0].includes('Overdracht van aandelen')) {
                addText(doc, x_pos, y_pos, cession());

                for(var i=0; i<getTailleListeDesCessions(); i++) y_pos += 8
            }
            if (temp[0].includes('Ontslag')) addText(doc, x_pos, y_pos, demission());
            if (temp[0].includes('Benoeming')) addText(doc, x_pos, y_pos, nomination());
            if (temp[0].includes('Overdracht van de statutaire zetel')) addText(doc, x_pos, y_pos, transfert());
            if (temp[0].includes('Changement')) addText(doc, x_pos, y_pos, changement());
        }
        y_pos += 15;
    };
    let deuxiemeResolution = function (){
        addText(doc, x_pos, y_pos, "tweede resolutie".toUpperCase());
        if (souligner){
            doc.setFillColor(0,0,0);
            doc.rect(x_pos, y_pos+0.5, 43, 0.2, 'F');
        }
        y_pos += 10;
        if ($('#select_objet_acte').val().length > 0 && $('#select_objet_acte').val() !== null) {
            var temp = $('#select_objet_acte').val();
            if (temp[1].includes('Overdracht van aandelen')) {
                addText(doc, x_pos, y_pos, cession());
                for(var i=0; i<getTailleListeDesCessions(); i++) y_pos += 5;
            }
            if (temp[1].includes('Ontslag')) addText(doc, x_pos, y_pos, demission());
            if (temp[1].includes('Benoeming')) addText(doc, x_pos, y_pos, nomination());
            if (temp[1].includes('Overdracht van de statutaire zetel')) addText(doc, x_pos, y_pos, transfert());
            if (temp[1].includes('Changement')) addText(doc, x_pos, y_pos, changement());
        }
        y_pos += 15;
    };
    let troisiemeResolution = function (){
        addText(doc, x_pos, y_pos, "derde resolutie".toUpperCase());
        if (souligner){
            doc.setFillColor(0,0,0);
            doc.rect(x_pos, y_pos+0.5, 40, 0.2, 'F');
        }
        y_pos += 10;
        if ($('#select_objet_acte').val().length > 0 && $('#select_objet_acte').val() !== null) {
            var temp = $('#select_objet_acte').val();
            if (temp[2].includes('Overdracht van aandelen')) {
                addText(doc, x_pos, y_pos, cession());
                for(var i=0; i<getTailleListeDesCessions(); i++) y_pos += 5;
            }
            if (temp[2].includes('Ontslag')) addText(doc, x_pos, y_pos, demission());
            if (temp[2].includes('Benoeming')) addText(doc, x_pos, y_pos, nomination());
            if (temp[2].includes('Overdracht van de statutaire zetel')) addText(doc, x_pos, y_pos, transfert());
            if (temp[2].includes('Changement')) addText(doc, x_pos, y_pos, changement());
        }
        y_pos += 15;
    };
    let quatriemeResolution = function (){
        addText(doc, x_pos, y_pos, "vierde resolutie".toUpperCase());
        if (souligner){
            doc.setFillColor(0,0,0);
            doc.rect(x_pos, y_pos+0.5, 40, 0.2, 'F');
        }
        y_pos += 10;
        if ($('#select_objet_acte').val().length > 0 && $('#select_objet_acte').val() !== null) {
            var temp = $('#select_objet_acte').val();
            if (temp[3].includes('Overdracht van aandelen')) {
                addText(doc, x_pos, y_pos, cession());
                for(var i=0; i<getTailleListeDesCessions(); i++) y_pos += 5;
            }
            if (temp[3].includes('Ontslag')) addText(doc, x_pos, y_pos, demission());
            if (temp[3].includes('Benoeming')) addText(doc, x_pos, y_pos, nomination());
            if (temp[3].includes('Overdracht van de statutaire zetel')) addText(doc, x_pos, y_pos, transfert());
            if (temp[3].includes('Changement')) addText(doc, x_pos, y_pos, changement());
        }
        y_pos += 15;
    };
    let cinquiemeResolution = function (){
        addText(doc, x_pos, y_pos, "vijfde resolutie".toUpperCase());
        if (souligner){
            doc.setFillColor(0,0,0);
            doc.rect(x_pos, y_pos+0.5, 40, 0.2, 'F');
        }
        y_pos += 10;
        if ($('#select_objet_acte').val().length > 0 && $('#select_objet_acte').val() !== null) {
            var temp = $('#select_objet_acte').val();
            if (temp[4].includes('Overdracht van aandelen')) {
                addText(doc, x_pos, y_pos, cession());
                for(var i=0; i<getTailleListeDesCessions(); i++) y_pos += 5;
            }
            if (temp[4].includes('Ontslag')) addText(doc, x_pos, y_pos, demission());
            if (temp[4].includes('Benoeming')) addText(doc, x_pos, y_pos, nomination());
            if (temp[4].includes('Overdracht van de statutaire zetel')) addText(doc, x_pos, y_pos, transfert());
            if (temp[4].includes('Changement')) addText(doc, x_pos, y_pos, changement());
        }
        y_pos += 15;
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
        addText(doc, x_pos, y_pos, "Na overdraagt van " + getTypeDividende() + " :");
        y_pos += 10;

        var cess = calculerLesParts();
        for(var i=0; i < cess.length ; i++){
            addText(doc, x_pos, y_pos, cess[i].titreCessionnaire + " " + cess[i].nomCessionnaire);
            addText(doc, x_pos+90, y_pos, cess[i].parts + " " + getTypeDividende(), {align: 'left'});
            y_pos += 5;
        }
    };

    if($('#select_objet_acte').val().indexOf('Overdracht van aandelen') >= 0)
    {
        nouvelleRepartition();
    }

    y_pos += 10;
    // addText(doc, x_pos, y_pos, "L'ordre du jour étant épuisé, la séance est levée après discussion et lecture du présent procès-verbal signé pour approbation par tous les" + " " + asso_actio + " " + "présents.");

    x_pos = 25;
    y_pos += 15;
    addText(doc, x_pos, y_pos,"Handtekeningen");

    y_pos += 15;
    signer(doc, x_pos, y_pos, liste, listeDesPersonnes);
}

function textePresence(){
    var liste = document.getElementById('div_nb');

    if (liste.childElementCount > 0) {
        var masculin = 0;
        var feminin = 0;
        for (var i = 0; i < liste.childElementCount; i++)
        {
            var id = liste.childNodes.item(i).id;
            id = id.substring(5);

            var id_ancien = document.getElementsByName('nb_'+ id +'_T');

            if (id_ancien[0].checked)
            {
                var id_sexe = document.getElementsByName('nb_' + id + '_S');
                if (id_sexe[0].checked) masculin++;
                if (id_sexe[1].checked) feminin++;
            }
        }

        if (masculin === 1 && feminin === 0) return "IS AANWEZIG";
        if (masculin === 1) return "ZIJN AANWEZIG";
        if (masculin > 1) return "ZIJN AANWEZIG";
        if (feminin === 1 && masculin === 0) return "IS AANWEZIG";
        if (feminin > 1 && masculin === 0) return "ZIJN AANWEZIG";
    }
    return "";
}

function triggerFullScreenPreloader() {
    let mainLoader = $('.main-loader');

    if (mainLoader.css('display') === 'flex') {
        mainLoader.css('display', 'none');
    } else {
        mainLoader.css('display', 'flex');
    }
}