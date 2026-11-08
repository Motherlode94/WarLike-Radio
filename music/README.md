# WarLike Music

Plateforme musicale **indépendante** de type bibliothèque et lecteur, développée pour l'écosystème WarLike.

**Application publique** : https://warlike-music.warlikeofficiel.workers.dev/

## Première version
- Import de fichiers audio personnels (lecture locale via l'élément HTML audio)
- Stockage IndexedDB des fichiers sur l'appareil et localStorage des métadonnées
- Classement par artistes et albums (métadonnées déduites du nom « Artiste - Titre » ; pas de récupération ID3 pour l'instant)
- Bibliothèque et recherche par titre, artiste ou album
- Favoris, playlists, ajout à la file d'écoute et suppression de titres
- Lecture/pause, précédent/suivant, progression, volume, aléatoire et modes de répétition
- Interface responsive ordinateur / mobile
- Aucune publicité ni catalogue fictif ; les fichiers musicaux ne sont pas envoyés au serveur.

## Limitations
- Cette version **n'est pas un service de streaming commercial** : elle n'offre ni catalogue de chansons sous licence ni diffusion d'autres artistes.
- Les fichiers restent sur l'appareil qui les a importés et peuvent être effacés si les données du site sont supprimées ; ils ne sont pas synchronisés avec WarLike Server.
- La précision des métadonnées dépend des noms de fichiers. La lecture dépend des formats audio supportés par le navigateur.
- Pas de vrais comptes WarLike, de publication artiste, d'abonnements, de paiement, de recommandations ni de distribution musicale.
- Le déploiement Cloudflare est manuel : les modifications de `music/index.html` ne sont pas automatiquement publiées.

## Architecture
- Interface autonome : `music/index.html` (HTML, CSS, JavaScript).
- Worker `warlike-music` sur Cloudflare qui sert l'interface et n'a aucun binding externe.
- Aucun secret ni identité WarLike dans l'application actuelle.

## Étapes suivantes
1. Créer un dépôt GitHub dédié `WarLike-Music` et y déplacer les sources, sans casser WarLike Radio.
2. Relier l'identité à WarLike Server / Keys.
3. Ajouter comptes artistes, publication de morceaux originaux ou dûment autorisés, pages d'artistes, albums et pochettes.
4. Stocker les fichiers sous licence dans R2, les métadonnées et droits dans D1, et proposer un streaming signé après validation.
5. Connecter WarLike Studio (export/publication) et WarLike Radio (stations) sans confondre stations radio et catalogue à la demande.

La revue de syntaxe JavaScript a été effectuée et le déploiement Workers confirmé, mais aucun test utilisateur bout-en-bout sur navigateur n'a encore été confirmé.
