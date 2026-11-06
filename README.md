# WarLike Radio

Lecteur radio et grille de programmation WarLike en mode local.

Fonctionnalités : lecture de fichiers audio chargés depuis l'appareil, URLs HTTPS de flux audio autorisés, liste de lecture, volume, recherche de position, programmation éditoriale sauvegardée localement.

**Important :** cette version ne diffuse pas vers plusieurs auditeurs ; elle ne fournit ni musique protégée, ni stream préchargé. Les fichiers chargés sont stockés seulement en mémoire de la session, les URLs et émissions dans localStorage. La diffusion live nécessitera un backend d'ingestion, de streaming et des droits de diffusion adaptés.

Déploiement : HTML, CSS et JS statiques sur Cloudflare Pages. Ouvrir index.html derrière un serveur HTTP local pour les tests.