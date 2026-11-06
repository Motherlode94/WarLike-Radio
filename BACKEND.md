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