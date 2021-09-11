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
    }
    else {
        window.open(doc.output('bloburl'));
    }

    triggerFullScreenPreloader();
}

function setPage1AG(doc, data, x_pos, y_pos){

    let numero_entreprise = data[0];
    let nom = data[1];
    let forme_legale = data[2];
    let rue = data[3];
    let numero_rue = data[4];
    let boite = data[5];
    let code_postal = data[6];
    let localite = data[7];
    let pays = data[8];

    if (boite !== "") boite = "Bte " + boite;

    let texte = data[10];
    let soussigne = data[11];
    let soussigneP = data[12];
    let agissant_comme = data[13];
    let fait_a = data[14];
    let date = data[15];
    let forme_legale_new = data[16];
    let rue_new = data[17];
    let numero_new = data[18];
    let boite_new = data[19];
    let code_postal_new = data[20];
    let localite_new = data[21];
    let pays_new = data[22];

    let asso_actio = getTypeOfPersons();

    let personnesArray = [];
    let personnesArraySansSexe = [];
    let anciens = [];
    let nouveaux = [];

    let liste = document.getElementById('div_nb');
    if (liste.childNodes.length > 0){

        for (let i=0; i < liste.childNodes.length ; i++){
            let id = liste.getElementsByTagName('div')[0].id;
            id = id.substring(5);
            let id_nom = 'nb_' + id + "_N";
            let id_prenom = 'nb_' + id + "_P";
            let id_sexe = document.getElementsByName('nb_'+id+'_S');
            let sexe = "";
            if (id_sexe[0].checked) sexe = id_sexe[0].value;
            if (id_sexe[1].checked) sexe = id_sexe[1].value;
            personnesArray[i] = sexe + " " + (document.getElementById(id_nom).value).toUpperCase() + " " + ((document.getElementById(id_prenom).value).charAt(0).toUpperCase() + (document.getElementById(id_prenom).value).substring(1));
            personnesArraySansSexe[i] = (document.getElementById(id_nom).value).toUpperCase() + " " + ((document.getElementById(id_prenom).value).charAt(0).toUpperCase() + (document.getElementById(id_prenom).value).substring(1));
            let ancien = "";
            let id_type = document.getElementsByName('nb_'+id+'_T');
            // if (id_type[0].checked) anciens[i] = sexe + " " + (document.getElementById(id_nom).value).toUpperCase() + " " + ((document.getElementById(id_prenom).value).charAt(0).toUpperCase() + (document.getElementById(id_prenom).value).substring(1));
            // if (id_type[1].checked) nouveaux[i] = sexe + " " + (document.getElementById(id_nom).value).toUpperCase() + " " + ((document.getElementById(id_prenom).value).charAt(0).toUpperCase() + (document.getElementById(id_prenom).value).substring(1));
        }
    }

    let listage = getListeDesCessionnaires();
    if(listage.length > 0){
        for (let i=0; i < listage.length; i++){
            if (listage[i].type === 'Ancien') {
                anciens.push(listage[i].titreCessionnaire + " " + listage[i].nomCessionnaire) ;
            }
            if (listage[i].type === 'Nouveau')  {
                nouveaux.push(listage[i].titreCessionnaire + " " + listage[i].nomCessionnaire);
            }
        }
    }

    let objet_acte = [];
    if ($('#select_objet_acte').val() !== "" && $('#select_objet_acte').val() !== null){
        let objet_acte_length = $('#select_objet_acte').val().length;
        let temp = $('#select_objet_acte').val();
        for (let i=0; i < temp.length; i++){
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
    addText(doc, x_pos, y_pos, "Numéro d'entreprise :" + " " +  numero_entreprise);

    x_pos += 10;
    y_pos += 15;
    doc.setFontStyle('bold');
    addText(doc, x_pos, y_pos, "Proces-verbal de l'assemblee generale extraordinaire".toUpperCase());
    doc.setFillColor(0,0,0);
    doc.rect(x_pos, y_pos+0.5, 140, 0.5, 'F');

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
    addText(doc, x_pos, y_pos, "qui " + getReuni(anciens) + " la totalité des " + getTypeDividende() + " représentatives du capital de la société.");

    y_pos += 10;
    addText(doc, x_pos, y_pos, "La séance est ouverte sous la présidence de" + " " + getPresident(liste) + ".");

    y_pos += 15;
    addText(doc, x_pos, y_pos, "Le président déclare ensuite : qui accepte");

    y_pos += 10;
    addText(doc, x_pos, y_pos, "1. que la présente assemblée a pour objet de délibérer quant à l'ordre du jour ici rappelé : ");

    x_pos += 65;
    y_pos += 15;
    addText(doc, x_pos, y_pos, "ordre du jour".toUpperCase());
    doc.setFillColor(0,0,0);
    doc.rect(x_pos, y_pos+0.5, 33.5, 0.2, 'F');

    x_pos -= 40;
    y_pos += 10;
    for (let i=0; i < objet_acte.length; i++){
        addText(doc, x_pos, y_pos, objet_acte[i]);
        y_pos += 5;
    }

    x_pos -= 25;
    y_pos += 5;
    addText(doc, x_pos, y_pos, "2. que tous les " + asso_actio + " ayant consenti à se réunir et étant présents, il ne doit pas être justifié " +
        "de l'envoi des convocations. La présente assamblée est par suite valablement réunie et apte à délibérer quant à l'ordre du jour établi.");

    y_pos += 30;
    addText(doc, x_pos, y_pos, "L'assemblée prend ensuite à l'unanimité et chaque fois par un vote séparé, les résolutions suivantes :");

    x_pos += 125;
    y_pos += 20;
    addText(doc, x_pos, y_pos, "Paraphes");
}

function setPage2AG(doc, data, x_pos, y_pos){

    doc.setFont('Times');
    doc.setFontSize(12);

    let numero_entreprise = data[0];
    let nom = data[1];
    let forme_legale = data[2];
    let rue = data[3];
    let numero_rue = data[4];
    let boite = data[5];
    let code_postal = data[6];
    let localite = data[7];
    let pays = data[8];

    if (boite !== "") boite = "Bte " + boite;

    let texte = data[10];
    let soussigne = data[11];
    let soussigneP = data[12];
    let agissant_comme = data[13];
    let fait_a = data[14];
    let date = data[15];
    let forme_legale_new = data[16];
    let rue_new = data[17];
    let numero_new = data[18];
    let boite_new = data[19];
    let code_postal_new = data[20];
    let localite_new = data[21];
    let pays_new = data[22];

    let asso_actio = getTypeOfPersons();

    let liste = document.getElementById('div_nb');
    let listeDesPersonnes = [];
    let listeDesConcessionnaires = [];
    let listeDesNouveauxGerants = [];

    if (liste.childElementCount > 0){
        for (let i=0; i < liste.childElementCount ; i++){
            let id = liste.getElementsByTagName('div')[0].id;
            id = id.substring(5);
            let choix_sexe = document.getElementsByName('nb_'+id+'_S');
            let sexe ="";
            if (choix_sexe[0].checked) sexe = choix_sexe[0].value;
            if (choix_sexe[1].checked) sexe = choix_sexe[1].value;

            listeDesPersonnes.push({
                titre: sexe,
                nom:  (document.getElementById('nb_' + id + "_N").value).toUpperCase() + " " + ((document.getElementById('nb_' + id + "_P").value).charAt(0).toUpperCase() + (document.getElementById('nb_' + id + "_P").value).substring(1)),
                // parts:  document.getElementById('nb_'+id+'_Parts').value
            });

            let type = document.getElementsByName('nb_'+id+'_T');
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

    let objet_acte = "";
    if ($('#select_objet_acte').val() !== "" && $('#select_objet_acte').val() !== null){
        let temp = $('#select_objet_acte').val();
        for (let i=0; i < temp.length; i++){
            objet_acte += "-    " + temp[i] + "\n";
        }
    }

    addText(doc, x_pos, y_pos, nom.toUpperCase());
    y_pos += 5;
    addText(doc, x_pos, y_pos, rue + " " + numero_rue + " " + boite);
    y_pos += 5;
    addText(doc, x_pos, y_pos, code_postal + " " + localite);
    y_pos += 5;
    addText(doc, x_pos, y_pos, "Numéro d'entreprise :" + " " +  numero_entreprise);

    let souligner = true;
    y_pos += 25;

    let premiereResolution = function () {
        addText(doc, x_pos, y_pos, "premiere resolution".toUpperCase());
        if (souligner) {
            doc.setFillColor(0, 0, 0);
            doc.rect(x_pos, y_pos + 0.5, 48.5, 0.2, 'F');
        }

        y_pos += 10;
        if ($('#select_objet_acte').val().length > 0 && $('#select_objet_acte').val() !== null) {
            let temp = $('#select_objet_acte').val();
            if (temp[0].includes('Transfert des')) {
                addText(doc, x_pos, y_pos, cession());

                for(let i=0; i<getTailleListeDesCessions(); i++) y_pos += 8
            }
            if (temp[0].includes('Nomination')) addText(doc, x_pos, y_pos, nomination());
            if (temp[0].includes('Démission')) addText(doc, x_pos, y_pos, demission());
            if (temp[0].includes('Transfert du siège social')) addText(doc, x_pos, y_pos, transfert());
            if (temp[0].includes('Changement')) addText(doc, x_pos, y_pos, changement());
        }
        y_pos += 15;
    };
    let deuxiemeResolution = function (){
        addText(doc, x_pos, y_pos, "deuxieme resolution".toUpperCase());
        if (souligner){
            doc.setFillColor(0,0,0);
            doc.rect(x_pos, y_pos+0.5, 49.5, 0.2, 'F');
        }
        y_pos += 10;
        if ($('#select_objet_acte').val().length > 0 && $('#select_objet_acte').val() !== null) {
            let temp = $('#select_objet_acte').val();
            if (temp[1].includes('Transfert des')) {
                addText(doc, x_pos, y_pos, cession());
                for(let i=0; i<getTailleListeDesCessions(); i++) y_pos += 5;
            }
            if (temp[1].includes('Nomination')) addText(doc, x_pos, y_pos, nomination());
            if (temp[1].includes('Démission')) addText(doc, x_pos, y_pos, demission());
            if (temp[1].includes('Transfert du siège social')) addText(doc, x_pos, y_pos, transfert());
            if (temp[1].includes('Changement')) addText(doc, x_pos, y_pos, changement());
        }
        y_pos += 15;
    };
    let troisiemeResolution = function (){
        addText(doc, x_pos, y_pos, "troisieme resolution".toUpperCase());
        if (souligner){
            doc.setFillColor(0,0,0);
            doc.rect(x_pos, y_pos+0.5, 50, 0.2, 'F');
        }
        y_pos += 10;
        if ($('#select_objet_acte').val().length > 0 && $('#select_objet_acte').val() !== null) {
            let temp = $('#select_objet_acte').val();
            if (temp[2].includes('Transfert des')) {
                addText(doc, x_pos, y_pos, cession());
                for(let i=0; i<getTailleListeDesCessions(); i++) y_pos += 5;
            }
            if (temp[2].includes('Nomination')) addText(doc, x_pos, y_pos, nomination());
            if (temp[2].includes('Démission')) addText(doc, x_pos, y_pos, demission());
            if (temp[2].includes('Transfert du siège social')) addText(doc, x_pos, y_pos, transfert());
            if (temp[2].includes('Changement')) addText(doc, x_pos, y_pos, changement());
        }
        y_pos += 15;
    };
    let quatriemeResolution = function (){
        addText(doc, x_pos, y_pos, "quatrieme resolution".toUpperCase());
        if (souligner){
            doc.setFillColor(0,0,0);
            doc.rect(x_pos, y_pos+0.5, 52.5, 0.2, 'F');
        }
        y_pos += 10;
        if ($('#select_objet_acte').val().length > 0 && $('#select_objet_acte').val() !== null) {
            let temp = $('#select_objet_acte').val();
            if (temp[3].includes('Transfert des')) {
                addText(doc, x_pos, y_pos, cession());
                for(let i=0; i<getTailleListeDesCessions(); i++) y_pos += 5;
            }
            if (temp[3].includes('Nomination')) addText(doc, x_pos, y_pos, nomination());
            if (temp[3].includes('Démission')) addText(doc, x_pos, y_pos, demission());
            if (temp[3].includes('Transfert du siège social')) addText(doc, x_pos, y_pos, transfert());
            if (temp[3].includes('Changement')) addText(doc, x_pos, y_pos, changement());
        }
        y_pos += 15;
    };
    let cinquiemeResolution = function (){
        addText(doc, x_pos, y_pos, "cinquieme resolution".toUpperCase());
        if (souligner){
            doc.setFillColor(0,0,0);
            doc.rect(x_pos, y_pos+0.5, 52.5, 0.2, 'F');
        }
        y_pos += 10;
        if ($('#select_objet_acte').val().length > 0 && $('#select_objet_acte').val() !== null) {
            let temp = $('#select_objet_acte').val();
            if (temp[4].includes('Transfert des')) {
                addText(doc, x_pos, y_pos, cession());
                for(let i=0; i<getTailleListeDesCessions(); i++) y_pos += 5;
            }
            if (temp[4].includes('Nomination')) addText(doc, x_pos, y_pos, nomination());
            if (temp[4].includes('Démission')) addText(doc, x_pos, y_pos, demission());
            if (temp[4].includes('Transfert du siège social')) addText(doc, x_pos, y_pos, transfert());
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

    let nouvelleRepartition = function(){
        addText(doc, x_pos, y_pos, "La nouvelle répartition des " + getTypeDividende() + " est la suivante :");
        y_pos += 10;

        let cess = calculerLesParts();
        for(let i=0; i < cess.length ; i++){
            addText(doc, x_pos, y_pos, cess[i].titreCessionnaire + " " + cess[i].nomCessionnaire);
            addText(doc, x_pos+90, y_pos, cess[i].parts + " " + getTypeDividende(), {align: 'left'});
            y_pos += 5;
        }
    };

    if($('#select_objet_acte').val().indexOf('Transfert des parts sociales') >= 0 || $('#select_objet_acte').val().indexOf('Transfert des actions') >= 0)
    {
        nouvelleRepartition();
    }

    y_pos += 10;
    addText(doc, x_pos, y_pos, "L'ordre du jour étant épuisé, la séance est levée après discussion et lecture du présent procès-verbal signé pour approbation par tous les" + " " + asso_actio + " " + "présents.");

    x_pos = 25;
    y_pos += 15;
    addText(doc, x_pos, y_pos,"Signatures");

    y_pos += 15;
    signer(doc, x_pos, y_pos, liste, listeDesPersonnes);
}

function textePresence(){
    let liste = document.getElementById('div_nb');

    if (liste.childElementCount > 0) {
        let masculin = 0;
        let feminin = 0;
        for (let i = 0; i < liste.childElementCount; i++)
        {
            let id = liste.childNodes.item(i).id;
            id = id.substring(5);

            let id_ancien = document.getElementsByName('nb_'+ id +'_T');

            if (id_ancien[0].checked)
            {
                let id_sexe = document.getElementsByName('nb_' + id + '_S');
                if (id_sexe[0].checked) masculin++;
                if (id_sexe[1].checked) feminin++;
            }
        }
        console.log('masculin : ' + masculin);
        console.log('feminin : ' + feminin);

        if (masculin === 1 && feminin === 0) return "EST PRESENT";
        if (masculin === 1) return "SONT PRESENTS";
        if (masculin > 1) return "SONT PRESENTS";
        if (feminin === 1 && masculin === 0) return "EST PRESENTE";
        if (feminin > 1 && masculin === 0) return "SONT PRESENTES";
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