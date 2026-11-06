# WarLike Radio

Lecteur radio et grille de programmation WarLike en mode local.

Fonctionnalités : lecture de fichiers audio chargés depuis l'appareil, URLs HTTPS de flux audio autorisés, liste de lecture, volume, recherche de position, programmation éditoriale sauvegardée localement.

**Important :** cette version ne diffuse pas vers plusieurs auditeurs ; elle ne fournit ni musique protégée, ni stream préchargé. Les fichiers chargés sont stockés seulement en mémoire de la session, les URLs et émissions dans localStorage. La diffusion live nécessitera un backend d'ingestion, de streaming et des droits de diffusion adaptés.

Déploiement : HTML, CSS et JS statiques sur Cloudflare Pages. Ouvrir index.html derrière un serveur HTTP local pour les tests.

## Radios réelles (catalogue)

L'onglet **Radios en direct** propose **15 stations** françaises : France Inter, franceinfo, France Culture, France Musique, Mouv', FIP et neuf déclinaisons thématiques FIP (Hip-Hop, Groove, Electro, Rock, Jazz, Reggae, Monde, Metal, Pop). Les cartes permettent de chercher par nom, filtrer par genre, lancer le lecteur HTML5 et rejoindre les sites officiels. Le catalogue est conservé dans `app.js`, sans dépendance à une API tierce ni transfert des fichiers personnels.

**Sources** : [Radio France — Open API, flux des principales stations](https://developers.radiofrance.fr/doc/en/tutorial-by-example/list-brands) ; [répertoire des flux FIP thématiques](https://www.fluxradios.com/Radios-France/France-Radio-France/Fip-Webradios-France).

Les flux distants et leurs conditions d'utilisation appartiennent à leurs diffuseurs. La présence d'une URL publiée n'est pas une licence de rediffusion. WarLike Radio reste un lecteur côté utilisateur : **il n'héberge, ne réémet ni n'enregistre ces flux**. Les canaux peuvent changer d'adresse, être géobloqués ou être incompatibles avec certains navigateurs. Dans ce cas, ouvrir le **site officiel** de la radio. Les flux référencés n'ont pas pu faire l'objet d'une validation de lecture audio depuis l'environnement de développement ; effectuer un test navigateur sur chaque canal avant de qualifier la release de validée.

## Navigation avancée (mise à jour)

- Favoris sur les stations du catalogue et les flux ajoutés par l'utilisateur, sauvegardés dans le stockage local du navigateur.
- Historique local des 12 dernières stations **sélectionnées**, sans suivi serveur.
- Filtres par genre, recherche, tri alphabétique, par genre ou par sélection récente et filtrage favoris uniquement.
- Boutons de favoris et de partage dans le lecteur ; l'URL partagée est le site officiel quand il existe, sinon l'URL du flux personnel.
- Réessayer un flux en erreur et ouvrir son site officiel lorsque disponible. Le lecteur ne garantit ni la disponibilité ni la qualité des flux externes.
- Commandes clavier hors champs et contrôles interactifs : **Espace** lecture/pause, **M** couper/remettre le son. Intégration Media Session lorsque le navigateur le permet.
- Volume mémorisé localement ; fichiers personnels toujours limités à la session.
- Le catalogue de 15 stations reste le même. Pas de réémission, transcodage ni d'enregistrement de flux.

Pour vérifier la mise à jour : parcourir les radios, enregistrer une favorite, recharger la page, filtrer les favoris, lancer une radio, tester une URL invalide et le bouton Réessayer, importer un fichier puis changer de station. Ces vérifications nécessitent un navigateur et des flux accessibles ; la syntaxe seule ne valide pas la lecture audio.


## Écoute musicale et publicités

Le catalogue propose un filtre **♫ Musique uniquement** (FIP, ses déclinaisons, France Musique, Mouv') et un accès rapide à FIP. Ce filtre ne constitue pas une garantie d'absence de publicités. WarLike Radio ne possède aucune régie publicitaire intégrée dans son lecteur local et ne peut pas enlever les annonces insérées dans des flux tiers. La station WarLike ON AIR peut fonctionner sans publicités uniquement si l'équipe maîtrise son contenu et son flux.
