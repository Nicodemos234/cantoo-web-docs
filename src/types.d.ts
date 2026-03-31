export type Voice = {
  name: string;
  id: string;
  lang?: string;
};

/**
 * Types d'événements d'utilisation de Cantoo Web.
 */
export type UsageEvent =
  | "CANTOO_READ_TEXT"
  | "CANTOO_ADAPT_TEXT"
  | "CANTOO_DICTATE_TEXT"
  | "CANTOO_TRANSLATED_TEXT"
  | "CANTOO_DEFINED_TEXT";

/**
 * Gestion de la dictée vocale (reconnaissance vocale).
 */
export interface Speech2Text {
  /**
   * Indique si la dictée est actuellement en cours.
   */
  isListening: boolean;

  /**
   * Démarre la reconnaissance vocale.
   *
   * @param onResult - Fonction appelée avec les résultats de la dictée.
   * @param localeProp - (optionnel) Code de langue à utiliser (ex: "fr-FR"). Si non fourni, la langue est déduite automatiquement.
   * @param onStartDownloadModel - (optionnel) Callback appelé au début du téléchargement d'un modèle vocal si nécessaire.
   * @param onEndDownloadModel - (optionnel) Callback appelé à la fin du téléchargement d'un modèle vocal.
   * @returns Une promesse qui se résout lorsque la dictée démarre.
   * @throws Une erreur si aucun locale n'est fourni ou détectable, si la Speech API n'est pas disponible ou si les permissions sont refusées.
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

/**
 * Types de données pour la dictée vocale.
 */
export type VocalDictationData = {
  lang?: string;
};

/**
 * Types de données pour la lecture vocale.
 */
export type VocalReadingData = {
  lang?: string;
  voice?: string;
  rate?: number;
  delay?: number;
};

/**
 * Types de données pour les options de plugin.
 */
export type PluginOptionsData = {
  textExtractionOnModal?: boolean;
  activeOptions?: Array<
    | "vocalRecognition"
    | "vocalSynthesis"
    | "textCustomization"
    | "translator"
    | "dictionary"
    | "visualAssistance"
    | "floatingBar"
    | "readMode"
  >;
  language?: string;
};

/**
 * Options d'accessibilité.
 */
export interface AccessibilityOptions {
  wordSpacing?: number;
  syllableSpacing?: number;
  lineSpacing?: number;
  letterSpacing?: number;
  fontSize?: number;
  fontFamily?: string;

  syllableSeparator?: "|" | "-" | "/" | "+" | "·";
  colorByMode?: "word" | "syllable" | "sound";
  colorSet?: string[];
  soundsColors?: { [sound: string]: string };
  soundsBackgroundColors?: Record<string, string>;
  specialStrategy?: {
    type?: "bionic" | "bounds" | "sounds" | "silent";
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
  contrastMode?: "highContrast" | "darkMode";
  invertImages?: boolean;
  readBand?: boolean;
  bandWidth?: number;
  bandOpacity?: number;
}

/**
 * Interface définissant la structure des données de configuration Cantoo Web.
 * Cette interface est un enregistrement (Record) avec des clés spécifiques.
 */
export interface CantooWebData {
  "vocal-dictation": VocalDictationData;
  "vocal-reading": VocalReadingData;
  "accessibility-options": AccessibilityOptions;
  "plugin-options": PluginOptionsData;
}

/**
 * Paramètres acceptés par {@link Cantoo.setConfig}.
 * Mise à jour partielle : chaque section fournie est fusionnée avec la configuration en cours
 * (fusion superficielle des objets par section).
 *
 * Peut être un objet partiel ou une fonction recevant la configuration courante et retournant
 * les sections à modifier (comme un `setState` React).
 */
export type SetConfigParams =
  | Partial<CantooWebData>
  | ((current: CantooWebData) => Partial<CantooWebData>);

/**
 * Gestion de la synthèse vocale (text-to-speech).
 */
export interface Text2Speech {
  /**
   * Liste toutes les voix disponibles sur le système.
   * @returns Un tableau de voix utilisables.
   */
  readVoices: () => Voice[];

  /**
   * Retourne une voix à partir de son identifiant.
   * @param voiceId - Identifiant de la voix.
   * @returns L'objet SpeechSynthesisVoice correspondant.
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

/**
 * Objet global Cantoo exposé par le script Cantoo Web.
 */
export interface Cantoo {
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
  /**
   * Met à jour partiellement la configuration utilisateur sans remplacer tout le profil.
   * Contrairement à {@link Cantoo.load}, les sections omises sont conservées ; pour chaque section
   * présente, les champs fournis sont fusionnés avec les valeurs déjà en cache.
   *
   * @param params - Sous-ensemble de {@link SetConfigParams} à appliquer.
   */
  setConfig: (params: SetConfigParams) => void;
  addParameterChangeListener: (
    listener: (params: CantooWebData) => void
  ) => void;
  removeParameterChangeListener: (
    listener: (params: CantooWebData) => void
  ) => void;
  addUsageEventListener: (listener: (event: UsageEvent) => void) => void;
  removeUsageEventListener: (listener: (event: UsageEvent) => void) => void;
}
