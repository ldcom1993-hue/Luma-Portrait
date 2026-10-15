# Luma Portrait — vitrine

Site one page statique, en français, respectant la charte Luma Portrait : violet `#8c52ff`, noir `#050505`, gris `#d5d5d5`, blanc, logo original et Poppins.

## Structure

- `dist/index.html` : présentation, deux comparateurs avant/après, événementiel, entreprises, FAQ, contact.
- `dist/style.css` : styles responsive et préférences de mouvement réduit.
- `dist/script.js` : curseurs tactiles, souris, clavier et animations discrètes.
- `dist/assets/` : portraits fournis, logos extraits de la charte et polices Poppins avec leur licence OFL.

## Utilisation

Servir le dossier `dist` avec un hébergement statique. Aucun build ni dépendance n’est requis. Tous les visuels et polices sont locaux. Les liens de contact ouvrent un e-mail vers **contact@lumaportrait.fr** ; aucun formulaire ne simule un envoi.

Les portraits avant/après sont des exemples illustratifs fournis pour la vitrine. Aucun témoignage, client ou résultat commercial n’est inventé.

## Validation

`node --check dist/script.js`

Les contrôles de livraison vérifient les assets, ancres, navigation, la logique des curseurs et la concordance avec la charte. La validation visuelle dans un navigateur reste à compléter lorsque le navigateur de contrôle est disponible.

## Illustrations

Les deux visuels fournis sont conservés dans `assets-source/illustrations/`. Les versions WebP servies par le site sont dans `dist/assets/illustrations/` : douze portraits indépendants et le parcours complet avec six découpes de la borne. La mosaïque se réorganise sur 6, 4 ou 3 colonnes. Le parcours passe de l’illustration complète à six étapes HTML lisibles sous 1 100 px ; les textes restent accessibles aux lecteurs d’écran sur tous les formats. Les images sont chargées à la demande et ne nécessitent aucune génération côté navigateur.
