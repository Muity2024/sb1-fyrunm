# Tests Fonctionnels Selenium Avancés

Suite de tests fonctionnels automatisés avec Selenium WebDriver, conçue pour simuler des interactions utilisateur réalistes.

## Fonctionnalités

- Navigation automatisée multi-sites
- Simulation d'interactions utilisateur réalistes
- Défilement fluide des pages
- Vérifications de contenu
- Gestion des erreurs robuste
- Configuration centralisée

## Prérequis

- Node.js
- Chrome WebDriver

## Installation

1. Installez les dépendances :
```bash
npm install
```

2. Assurez-vous d'avoir ChromeDriver installé et dans votre PATH

## Configuration

Modifiez `config.js` pour personnaliser :
- Les URLs à tester
- Les délais d'attente
- Le comportement du défilement

## Exécution

Lancer tous les tests :
```bash
npm test
```

## Structure du Projet

- `config.js` : Configuration centralisée
- `utils.js` : Fonctions utilitaires réutilisables
- `test.js` : Script de test principal