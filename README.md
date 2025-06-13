# cantoo-web-docs
Documentation for Cantoo Web

# Intégration du script Cantoo Web

Ce projet permet d'ajouter facilement les fonctionnalités d'accessibilité de Cantoo Web à vos pages HTML.

## 🔧 Intégration

Pour intégrer le script à votre site, ajoutez simplement la balise suivante dans les pages HTML où vous souhaitez l'activer :

```html
<script type="module" src="https://download.cantoo.fr/cantoo-web-xxx.js" defer></script>
```

Remplacez `xxx` par le nom de votre projet, qui vous a été communiqué lors de notre collaboration.

---

## 🔄 Mises à jour

Les mises à jour du script sont automatiques. Aucune action n'est nécessaire de votre part pour bénéficier des dernières fonctionnalités et corrections.

---

## 🌐 Options : Élément global Cantoo

Une fois intégré, vous bénéficiez déjà de l'adaptation offerte par Cantoo Web et vous n'avez **rien à faire**. Toutefois, si vous souhaitez un niveau d'intégration plus fin, ou mettre à profit les fonctionnalités de Cantoo Web pour améliorer votre produit, le script expose un objet global nommé Cantoo contenant plusieurs fonctionnalités clés, permettant de contrôler les fonctionnalités de l'outil :

```js
/**
 * Objet global Cantoo exposé par le script Cantoo Web.
 */
declare const Cantoo: {
  speech2text: Speech2Text;
  text2speech: Text2Speech;
  writeTextOnInput: (spokenText: string, inputTarget?: HTMLElement) => void;
  openCantooWebConfig: () => void;
  formatText: (html: string) => string;
  login: (login: string, password: string) => Promise<void>;
  logout: () => void;
};
```

### 🗣️ speech2text — Reconnaissance vocale (dictée)

```js
/**
 * Gestion de la dictée vocale (reconnaissance vocale).
 */
interface Speech2Text {
  /**
   * Indique si la dictée est actuellement en cours.
   */
  isListening: boolean;

  /**
   * Démarre la reconnaissance vocale.
   *
   * @param onResult - Fonction appelée avec les résultats de la dictée.
   * @param localeProp - (optionnel) Code de langue à utiliser (ex: "fr-FR"). Si non fourni, la langue est déduite automatiquement.
   * @param onStartDownloadModel - (optionnel) Callback appelé au début du téléchargement d’un modèle vocal si nécessaire.
   * @param onEndDownloadModel - (optionnel) Callback appelé à la fin du téléchargement d’un modèle vocal.
   * @returns Une promesse qui se résout lorsque la dictée démarre.
   * @throws Une erreur si aucun locale n’est fourni ou détectable, si la Speech API n’est pas disponible ou si les permissions sont refusées.
   */
  start: (
    onResult: (results?: string[]) => void,
    localeProp?: string,
    onStartDownloadModel?: () => void,
    onEndDownloadModel?: () => void
  ) => Promise<void>;

  /**
   * Arrête la reconnaissance vocale.
   * @returns Une promesse qui se résout lorsque la dictée est arrêtée.
   */
  stop: () => Promise<void>;
}
```

### 🔊 text2speech — Synthèse vocale (lecture de texte)

```js
/**
 * Gestion de la synthèse vocale (text-to-speech).
 */
interface Text2Speech {
  /**
   * Liste toutes les voix disponibles sur le système.
   * @returns Un tableau de voix utilisables.
   */
  readVoices: () => Voice[];

  /**
   * Retourne une voix à partir de son identifiant.
   * @param voiceId - Identifiant de la voix.
   * @returns L’objet SpeechSynthesisVoice correspondant.
   */
  getVoice: (voiceId: string) => SpeechSynthesisVoice;

  /**
   * Utterance en cours, si applicable.
   */
  utter: SpeechSynthesisUtterance;

  /**
   * Instance native de synthèse vocale, ou undefined si non disponible.
   */
  synth: SpeechSynthesis | undefined;

  /**
   * Lit un texte à haute voix.
   * @param readText - Le texte à lire.
   */
  readText: (readText: string) => void;

  /**
   * Configure les paramètres de synthèse vocale.
   * @param config - Objet de configuration.
   */
  setConfig: (config: {
    voice: string;
    lang: string;
    volume?: number;
    rate?: number;
    pitch?: number;
  }) => void;

  /**
   * Récupère la configuration actuelle de synthèse vocale.
   * @returns Les paramètres configurés.
   */
  getConfig: () => {
    voice: string | undefined;
    lang: string;
    volume: number;
    rate: number;
    pitch: number;
  };
}
```

### 🧠 writeTextOnInput — Insertion de texte dicté

```js
/**
 * Insère un texte dicté dans un champ de saisie HTML.
 * 
 * @param spokenText - Le texte à insérer.
 * @param inputTarget - (optionnel) L'élément HTML cible. Si non défini, le focus actuel est utilisé.
 */
declare function writeTextOnInput(spokenText: string, inputTarget?: HTMLElement): void;
```

### ⚙️ openCantooWebConfig — Ouverture de l’interface de configuration

```js
/**
 * Ouvre l’interface de configuration utilisateur Cantoo Web.
 */
declare function openCantooWebConfig(): void;
```

### 🎨 formatText — Application des préférences d’accessibilité

```js
/**
 * Applique les préférences d’accessibilité de l’utilisateur à un contenu HTML.
 *
 * @param html - Le HTML d’origine.
 * @returns Le HTML transformé avec les préférences appliquées.
 */
declare function formatText(html: string): string;
```

### 🔐 login — Connexion utilisateur

```js
/**
 * Connecte un utilisateur à la base de données Cantoo.
 *
 * ⚠️ Un protocole doit être mis en place avec l’équipe Cantoo pour permettre l’enregistrement.
 *
 * @param login - Identifiant de l'utilisateur.
 * @param password - Mot de passe de l'utilisateur.
 * @returns Une promesse résolue à la fin de la connexion.
 */
declare function login(login: string, password: string): Promise<void>;

/**
 * Déconnecte l’utilisateur actuellement connecté.
 */
declare function logout(): void;
```

---

## 🎯 Désactivation sur certains éléments

### 🚫 Classe CSS `cantoo-ignore-vocal-recognition` - Désactiver la reconnaissance vocale

Si vous souhaitez gérer manuellement la dictée vocale dans certains champs de saisie, vous pouvez utiliser la classe CSS `cantoo-ignore-vocal-recognition`. Vous pourrez alors créer votre propre bouton pour déclencher et arrêter la reconnaissance vocale et l'ajouter à votre propre barre d'outils

```html
<!-- Cet input n'aura pas le bouton de dictée vocale inséré automatiquement -->
<input type="text" class="cantoo-ignore-vocal-recognition" />
```

Cette classe empêche l’insertion automatique du bouton de dictée vocale dans l’élément ciblé. Vous pouvez ainsi utiliser les fonctions de l’API `window.Cantoo.speech2text` pour implémenter votre propre logique de traitement, et placer le bouton dans votre barre d’outils ou à l’emplacement de votre choix.

### 🚫 Classe CSS `cantoo-ignore-hover-events` - Désactiver la barre d'outils au survol

Si vous souhaitez empêcher l’affichage du Tooltip Cantoo lors du survol d’un élément ou de ses enfants, ajoutez la classe CSS `cantoo-ignore-hover-events` à cet élément.

```html
<!-- Aucun Tooltip Cantoo ne sera affiché lors du survol de cet élément ou de ses enfants -->
<div class="cantoo-ignore-hover-events">...</div>
```

Cette classe désactive l’apparition du Tooltip Cantoo sur l’élément ciblé ainsi que sur tous ses descendants lors d’un survol avec la souris.

> ℹ️ **Note :** Il reste possible de sélectionner du texte dans ces éléments pour l’adapter, même si le Tooltip n’apparaît pas au survol.

---

## ❓ Assistance

Pour toute question ou pour obtenir un nom de projet, veuillez contacter notre équipe Cantoo.

---

© Cantoo - Tous droits réservés.
