# Backend de WarLike Radio

Cette version conserve le lecteur local de `index.html`. `public.html` est le mode partagé, alimenté par l'API Cloudflare Pages Functions et D1.

## Configuration à effectuer sur Cloudflare

1. Créer une base D1 dédiée à Radio, puis appliquer `migrations/0001_radio.sql` à cette base.
2. Dans le projet Cloudflare Pages de WarLike Radio, ajouter le binding D1 `RADIO_DB` vers cette base, pour la production et les environnements de prévisualisation concernés.
3. Ajouter le secret d'environnement `RADIO_ADMIN_TOKEN` (valeur aléatoire de 24 caractères minimum). Ne jamais le committer. Limiter l'accès administrateur.
4. Redéployer les Pages Functions et vérifier `/api/health`, `/api/station` et `/public.html`.

## API

- `GET /api/station` : configuration de station et grille publique.
- `POST /api/station` : nom, description et URL HTTPS du flux, avec `Authorization: Bearer <RADIO_ADMIN_TOKEN>`.
- `POST /api/shows` : ajouter une émission (day 0–6, start_time HH:MM, duration_minutes, title, host).
- `POST /api/shows/delete` : supprimer une émission par identifiant.

Les requêtes d'administration doivent provenir de la même origine que l'API. Aucun secret n'est livré au navigateur. Cette version ne fournit **pas** d'ingestion audio, de transcodage, de relais, de droits musicaux ou de diffusion automatique : elle publie les métadonnées et permet la lecture d'un flux HTTPS existant autorisé. Le direct peut nécessiter un fournisseur de streaming adapté.

## Régie ON AIR (v2)

1. Appliquer la migration **`migrations/0002_on_air.sql`** sur la même base D1 `RADIO_DB`, après `0001_radio.sql`.
2. Vérifier le binding D1 `RADIO_DB` et le secret `RADIO_ADMIN_TOKEN` dans Cloudflare Pages (ne pas les publier dans le dépôt).
3. Ouvrir `/control.html` et saisir le secret administrateur. Celui-ci reste uniquement en mémoire dans la page et est vidé quand l'onglet devient invisible.
4. Enregistrer **sa propre URL de flux HTTPS**, qui doit déjà être produite par une infrastructure de streaming autorisée.
5. Renseigner le titre de l'émission, son animateur et l'annonce ; choisir « Passer ON AIR ». La commande authentifiée `POST /api/on-air` sauvegarde l'état en D1.
6. Ouvrir `/public.html` sur un deuxième appareil : l'état est actualisé toutes les 15 secondes. Démarrer la lecture manuellement ; vérifier la réception audio réelle. Utiliser « Hors antenne » depuis la régie pour retirer le lecteur public.

**Attention :** ON AIR est un indicateur éditorial, pas une mesure technique de disponibilité audio. WarLike Radio n'ingère pas de micro ni de mix, ne transcode pas et ne relaye pas l'audio. Le direct réel dépend d'une source audio HTTPS externe, d'un encodeur, et des autorisations de diffusion. Les 15 stations tierces du catalogue ne sont pas à utiliser comme flux source de la station WarLike sans autorisation.

### API complémentaire

`POST /api/on-air` avec en-têtes `Content-Type: application/json`, `Authorization: Bearer <secret>` et JSON `{ "is_on_air": true, "show_title": "Émission", "host": "Animateur", "message": "Annonce" }`. Un flux station valide est obligatoire pour l'activation. `GET /api/station` expose l'état public `live` en lecture seule.

Cette mise à jour nécessite l'application réelle des migrations et un déploiement Pages Functions ; un commit GitHub ne suffit pas à activer l'antenne.
