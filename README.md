# Production Virtual Twin Presentation - Mode Automatique

Présentation automatique du système de production avec défilement automatique des slides.

## Fonctionnalités

- **Défilement automatique**: La présentation avance automatiquement avec des timings prédéfinis
- **Un seul clic**: L'utilisateur clique sur "Start" et la présentation se déroule toute seule
- **Synchronisation 3D**: Les objets 3D du système de production (Manufacturing Sound, PSY 1-5, etc.) s'affichent automatiquement via le SDK
- **Timings optimisés**: Chaque slide a une durée adaptée à la quantité de texte

## Structure de la présentation

### Slides avec timings:

1. **Introduction** (10s) - "Virtual Twin of the Production System..."
2. **PSY 1** (17s) - "The virtual twin brings everything together..."
3. **PSY 2** (20s) - "Aerospace & defense contract example..."
4. **PSY 3** (8s) - "Virtual companion supports work instructions..."
5. **PSY 4** (17s) - "Sense Computing - virtual meets real..."
6. **PSY 5** (5s) - Transition visuelle
7. **PSY Content** (manuel) - "The result? Errors are prevented..." - Nécessite clic sur "Finish"

**Durée totale automatique**: ~77 secondes

## Objets 3D du système de production

La présentation contrôle la visibilité des objets suivants via le SDK:
- **Manufacturing Sound** - Son d'ambiance usine (activé au démarrage)
- **AS IS Production** - Visible au début, caché à la fin
- **PSY 1, PSY 2, PSY 3, PSY 4, PSY 5** - Composants progressifs
- **PSY Content** - Vue finale complète

## Comportement

1. **Avant le démarrage**:
   - Écran d'intro avec bouton "Start Presentation"
   - Tous les objets PSY sont cachés
   - AS IS Production est visible

2. **Pendant la présentation**:
   - Le bouton disparaît
   - Les slides défilent automatiquement
   - Chaque objet 3D s'ajoute progressivement
   - Les objets précédents restent visibles

3. **Dernière slide**:
   - Le bouton "Finish" réapparaît
   - L'utilisateur peut terminer manuellement

4. **Écran de fin**:
   - "Thank you - Presentation Complete"
   - Bouton "Restart Presentation" pour recommencer

## Différences avec les autres versions

- **production-presentation**: Version manuelle - l'utilisateur clique pour avancer
- **production-presentation-collab**: Version collaborative avec Supabase sync
- **production-presentation-auto**: Défilement automatique (cette version)

## Utilisation

Intégrer dans un iframe du SDK Creative Experience:

```html
<iframe src="production-presentation-auto/index.html"></iframe>
```

Les objets 3D doivent être nommés dans le SDK:
- Manufacturing Sound
- AS IS Production
- PSY 1, PSY 2, PSY 3, PSY 4, PSY 5
- PSY Content

## Personnalisation des timings

Pour ajuster les durées, modifier le tableau `slides` dans [app.js](app.js):

```javascript
{
    text: "Votre texte...",
    media: "PSY 1",
    duration: 15000 // Durée en millisecondes (15s)
}
```

Pour la dernière slide, mettre `duration: 0` pour arrêter l'auto-progression.
