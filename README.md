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

## 📦 Installation via npm

Si vous utilisez un environnement Node.js ou un bundler moderne (Webpack, Vite, etc.), vous pouvez installer la bibliothèque via npm :

```bash
npm install @cantoo/cantoo-web
```

ou avec yarn :

```bash
yarn add @cantoo/cantoo-web
```

### Utilisation de la fonction `loadCantoo`

La bibliothèque npm expose une fonction `loadCantoo` qui charge dynamiquement le script Cantoo Web et retourne une promesse avec l'objet global `Cantoo` :

```typescript
import { loadCantoo } from "@cantoo/cantoo-web";

// Charger le script Cantoo Web
loadCantoo("https://download.cantoo.fr/cantoo-web-xxx.js")
  .then((Cantoo) => {
    console.log("Cantoo Web chargé avec succès");

    // Ou charger des paramètres personnalisés
    Cantoo.load({
      "vocal-dictation": {
        lang: "fr-FR",
      },
      "vocal-reading": {
        lang: "fr-FR",
        rate: 1.0,
      },
      "accessibility-options": {
        fontSize: 16,
        lineSpacing: 1.5,
      },
      "plugin-options": {
        language: "fr",
        activeOptions: [
          "vocalRecognition",
          "vocalSynthesis",
          "textCustomization",
        ],
      },
    });
  })
  .catch((error) => {
    console.error("Erreur lors du chargement de Cantoo Web:", error);
  });
```

### Support TypeScript

La bibliothèque inclut des définitions TypeScript complètes pour l'API Cantoo Web. Vous bénéficiez ainsi de l'autocomplétion et de la vérification de types dans votre IDE :

```typescript
import {
  loadCantoo,
  type Cantoo,
  type CantooWebData,
} from "@cantoo/cantoo-web";

// Types disponibles pour l'objet Cantoo et ses paramètres
const params: CantooWebData = {
  "vocal-dictation": { lang: "fr-FR" },
  "vocal-reading": { lang: "fr-FR", rate: 1.0 },
  "accessibility-options": {},
  "plugin-options": {},
};

loadCantoo("https://download.cantoo.fr/cantoo-web-xxx.js").then(
  (cantoo: Cantoo) => {
    cantoo.load(params);
  }
);
```

> **Note :** Remplacez `xxx` par le nom de votre projet dans l'URL du script.

---

## 🔄 Mises à jour

Les mises à jour du script sont automatiques. Aucune action n'est nécessaire de votre part pour bénéficier des dernières fonctionnalités et corrections.

---

## 🌐 Options : Élément global Cantoo

Une fois intégré, vous bénéficiez déjà de l'adaptation offerte par Cantoo Web et vous n'avez **rien à faire**. Toutefois, si vous souhaitez un niveau d'intégration plus fin, ou mettre à profit les fonctionnalités de Cantoo Web pour améliorer votre produit, le script expose un objet global accessible via window.Cantoo contenant plusieurs fonctionnalités clés, permettant de contrôler les fonctionnalités de l'outil :

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
  activate: () => void;
  deactivate: () => void;
  load: (params: CantooWebData) => void;
  addParameterChangeListener: (listener: (params: CantooWebData) => void) => void;
  removeParameterChangeListener: (listener: (params: CantooWebData) => void) => void;
  addUsageEventListener: (listener: (event: UsageEvent) => void) => void;
  removeUsageEventListener: (listener: (event: UsageEvent) => void) => void;
};

/**
 * Types de données pour la dictée vocale.
 */
type VocalDictationData = {
  lang?: string;
};

/**
 * Types de données pour la lecture vocale.
 */
type VocalReadingData = {
  lang?: string;
  voice?: string;
  rate?: number;
  delay?: number;
};

/**
 * Types de données pour les options de plugin.
 */
type PluginOptionsData = {
  textExtractionOnModal?: boolean;
  activeOptions?: Array<'vocalRecognition' | 'vocalSynthesis' | 'textCustomization' | 'translator' | 'dictionary' | 'visualAssistance' | 'floatingBar'>;
  language?: string;
};

/**
 * Interface définissant la structure des données de configuration Cantoo Web.
 * Cette interface est un enregistrement (Record) avec des clés spécifiques.
 */
interface CantooWebData {
  'vocal-dictation': VocalDictationData;
  'vocal-reading': VocalReadingData;
  'accessibility-options': AccessibilityOptions;
  'plugin-options': PluginOptionsData;
}

/**
 * Options d'accessibilité.
 */
interface AccessibilityOptions {
  wordSpacing?: number;
  syllableSpacing?: number;
  lineSpacing?: number;
  letterSpacing?: number;
  fontSize?: number;
  fontFamily?: string;

  syllableSeparator?: '|' | '-' | '/' | '+' | '·';
  colorByMode?: 'word' | 'syllable' | 'sound';
  colorSet?: string[];
  soundsColors?: { [sound: string]: string };
  soundsBackgroundColors?: Record<string, string>;
  specialStrategy?: {
    type?: 'bionic' | 'bounds' | 'sounds' | 'silent';
    bold?: boolean;
    color?: string;
  };

  vocalSynthesis?: boolean;
  vocalSynthesisSpeed?: number;
  vocalSynthesisFeedbackDelay?: number;
  vocalSynthesisKeyboardFeedback?: boolean;
  vocalSynthesisButtonFeedback?: boolean;
  vocalSynthesisLabelFeedback?: boolean;
  vocalSynthesisWritingFeedback?: boolean;

  magnifier?: boolean;
  magnifierZoom?: number;
  dictionary?: boolean;
  translator?: boolean;
  contrastMode?: 'highContrast' | 'darkMode';
  invertImages?: boolean;
  readBand?: boolean;
  bandWidth?: number;
  bandOpacity?: number;
}
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

### 🟢 activate — Activer Cantoo Web

```js
/**
 * Active toutes les fonctionnalités de Cantoo Web sur la page.
 */
declare function activate(): void;
```

### 🔴 deactivate — Désactiver Cantoo Web

```js
/**
 * Désactive toutes les fonctionnalités de Cantoo Web sur la page.
 */
declare function deactivate(): void;
```

### 📥 load — Charger les paramètres de configuration

```js
/**
 * Charge les paramètres de configuration de Cantoo Web.
 *
 * @param params - Les paramètres de configuration à charger.
 */
declare function load(params: CantooWebData): void;
```

### 👂 addParameterChangeListener — Ajouter un écouteur de changement de paramètres

```js
/**
 * Ajoute un écouteur pour les changements de paramètres de configuration.
 *
 * @param listener - Fonction appelée lors des changements de paramètres.
 */
declare function addParameterChangeListener(
  listener: (params: CantooWebData) => void
): void;
```

### 🗑️ removeParameterChangeListener — Supprimer un écouteur de changement de paramètres

```js
/**
 * Supprime un écouteur de changement de paramètres précédemment ajouté.
 *
 * @param listener - L'écouteur à supprimer.
 */
declare function removeParameterChangeListener(
  listener: (params: CantooWebData) => void
): void;
```

### 📊 addUsageEventListener — Ajouter un écouteur d'événements d'utilisation

```js
/**
 * Type d'événement d'utilisation de Cantoo Web.
 */
type UsageEvent =
  | "CANTOO_READ_TEXT"
  | "CANTOO_ADAPT_TEXT"
  | "CANTOO_DICTATE_TEXT"
  | "CANTOO_TRANSLATED_TEXT"
  | "CANTOO_DEFINED_TEXT";

/**
 * Ajoute un écouteur pour les événements d'utilisation de Cantoo Web.
 * Permet de suivre les actions effectuées par les utilisateurs.
 *
 * @param listener - Fonction appelée lors des événements d'utilisation.
 */
declare function addUsageEventListener(
  listener: (event: UsageEvent) => void
): void;
```

**Exemple d'utilisation :**

```typescript
Cantoo.addUsageEventListener((event) => {
  console.log("Événement d'utilisation:", event);
  // Exemple: "CANTOO_READ_TEXT" lorsqu'un utilisateur utilise la synthèse vocale
});
```

### 🗑️ removeUsageEventListener — Supprimer un écouteur d'événements d'utilisation

```js
/**
 * Supprime un écouteur d'événements d'utilisation précédemment ajouté.
 *
 * @param listener - L'écouteur à supprimer.
 */
declare function removeUsageEventListener(
  listener: (event: UsageEvent) => void
): void;
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

### 🚫 Classe CSS `cantoo-ignore-all` - Désactiver complètement Cantoo Web sur un élément

Si vous souhaitez empêcher toute interaction Cantoo Web (barre d'outils au survol et barre d'outils lors de la sélection) sur un élément, ajoutez la classe CSS `cantoo-ignore-all` à cet élément.

```html
<!-- Cantoo Web sera totalement désactivé sur cet élément -->
<div class="cantoo-ignore-all">...</div>
```

Cette classe désactive à la fois l’apparition du Tooltip Cantoo au survol et l’apparition de la barre d'outils lors de la sélection sur l’élément ciblé et ses descendants.

---

## ❓ Assistance

Pour toute question ou pour obtenir un nom de projet, veuillez contacter notre équipe Cantoo.

---

© Cantoo - Tous droits réservés.
