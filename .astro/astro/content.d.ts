declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"songs": {
"01-air-pockets.md": {
	id: "01-air-pockets.md";
  slug: "01-air-pockets";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-auto-in.md": {
	id: "01-auto-in.md";
  slug: "01-auto-in";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-corporate-chains.md": {
	id: "01-corporate-chains.md";
  slug: "01-corporate-chains";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-crash-and-burn.md": {
	id: "01-crash-and-burn.md";
  slug: "01-crash-and-burn";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-me-myself-and-i.md": {
	id: "01-me-myself-and-i.md";
  slug: "01-me-myself-and-i";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-origami.md": {
	id: "01-origami.md";
  slug: "01-origami";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-personal-use-case.md": {
	id: "01-personal-use-case.md";
  slug: "01-personal-use-case";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-relearn.md": {
	id: "01-relearn.md";
  slug: "01-relearn";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-same-sky.md": {
	id: "01-same-sky.md";
  slug: "01-same-sky";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-sparks.md": {
	id: "01-sparks.md";
  slug: "01-sparks";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-starting-point.md": {
	id: "01-starting-point.md";
  slug: "01-starting-point";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-strings.md": {
	id: "01-strings.md";
  slug: "01-strings";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-the-crimson-five.md": {
	id: "01-the-crimson-five.md";
  slug: "01-the-crimson-five";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-the-crimson-one.md": {
	id: "01-the-crimson-one.md";
  slug: "01-the-crimson-one";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-the-curse-of-knowing.md": {
	id: "01-the-curse-of-knowing.md";
  slug: "01-the-curse-of-knowing";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-the-fate-time-decided.md": {
	id: "01-the-fate-time-decided.md";
  slug: "01-the-fate-time-decided";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-the-hand-that-lifts.md": {
	id: "01-the-hand-that-lifts.md";
  slug: "01-the-hand-that-lifts";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-the-last-order.md": {
	id: "01-the-last-order.md";
  slug: "01-the-last-order";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-the-protector.md": {
	id: "01-the-protector.md";
  slug: "01-the-protector";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-the-time-fate-guided.md": {
	id: "01-the-time-fate-guided.md";
  slug: "01-the-time-fate-guided";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-threefold-light.md": {
	id: "01-threefold-light.md";
  slug: "01-threefold-light";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-what-she-left-behind.md": {
	id: "01-what-she-left-behind.md";
  slug: "01-what-she-left-behind";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"01-wildfire.md": {
	id: "01-wildfire.md";
  slug: "01-wildfire";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-antidote.md": {
	id: "02-antidote.md";
  slug: "02-antidote";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-before-you-fall.md": {
	id: "02-before-you-fall.md";
  slug: "02-before-you-fall";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-chasing-shadows.md": {
	id: "02-chasing-shadows.md";
  slug: "02-chasing-shadows";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-checkmate.md": {
	id: "02-checkmate.md";
  slug: "02-checkmate";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-dimensional-rifts.md": {
	id: "02-dimensional-rifts.md";
  slug: "02-dimensional-rifts";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-firestarter.md": {
	id: "02-firestarter.md";
  slug: "02-firestarter";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-friendly-fire.md": {
	id: "02-friendly-fire.md";
  slug: "02-friendly-fire";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-gasoline-heart.md": {
	id: "02-gasoline-heart.md";
  slug: "02-gasoline-heart";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-half-of-something.md": {
	id: "02-half-of-something.md";
  slug: "02-half-of-something";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-heroes-of-the-west.md": {
	id: "02-heroes-of-the-west.md";
  slug: "02-heroes-of-the-west";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-hostile-witnesses.md": {
	id: "02-hostile-witnesses.md";
  slug: "02-hostile-witnesses";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-i-see-you.md": {
	id: "02-i-see-you.md";
  slug: "02-i-see-you";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-inside-the-structure.md": {
	id: "02-inside-the-structure.md";
  slug: "02-inside-the-structure";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-on-the-path-to-war.md": {
	id: "02-on-the-path-to-war.md";
  slug: "02-on-the-path-to-war";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-outside-the-pattern.md": {
	id: "02-outside-the-pattern.md";
  slug: "02-outside-the-pattern";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-quiet-electric.md": {
	id: "02-quiet-electric.md";
  slug: "02-quiet-electric";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-roadblocks-can-go-to-hell.md": {
	id: "02-roadblocks-can-go-to-hell.md";
  slug: "02-roadblocks-can-go-to-hell";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-social-matters.md": {
	id: "02-social-matters.md";
  slug: "02-social-matters";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-sound-of-defeat.md": {
	id: "02-sound-of-defeat.md";
  slug: "02-sound-of-defeat";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-stand-your-ground.md": {
	id: "02-stand-your-ground.md";
  slug: "02-stand-your-ground";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-the-hero.md": {
	id: "02-the-hero.md";
  slug: "02-the-hero";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-the-price-of-right.md": {
	id: "02-the-price-of-right.md";
  slug: "02-the-price-of-right";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"02-white-lightning.md": {
	id: "02-white-lightning.md";
  slug: "02-white-lightning";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-breathing-technique-ikiwosuu-ikiwohaku.md": {
	id: "03-breathing-technique-ikiwosuu-ikiwohaku.md";
  slug: "03-breathing-technique-ikiwosuu-ikiwohaku";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-customized-change.md": {
	id: "03-customized-change.md";
  slug: "03-customized-change";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-designated-survivor.md": {
	id: "03-designated-survivor.md";
  slug: "03-designated-survivor";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-empty-halls.md": {
	id: "03-empty-halls.md";
  slug: "03-empty-halls";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-flame-of-retribution.md": {
	id: "03-flame-of-retribution.md";
  slug: "03-flame-of-retribution";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-free-falling.md": {
	id: "03-free-falling.md";
  slug: "03-free-falling";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-high-on-you.md": {
	id: "03-high-on-you.md";
  slug: "03-high-on-you";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-hotter.md": {
	id: "03-hotter.md";
  slug: "03-hotter";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-i-choose-you.md": {
	id: "03-i-choose-you.md";
  slug: "03-i-choose-you";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-im-still-standing-fuckers.md": {
	id: "03-im-still-standing-fuckers.md";
  slug: "03-im-still-standing-fuckers";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-inception-perception.md": {
	id: "03-inception-perception.md";
  slug: "03-inception-perception";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-interpretations-and-hallucinations.md": {
	id: "03-interpretations-and-hallucinations.md";
  slug: "03-interpretations-and-hallucinations";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-intersecting-parallel.md": {
	id: "03-intersecting-parallel.md";
  slug: "03-intersecting-parallel";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-mata-ne-see-you-later.md": {
	id: "03-mata-ne-see-you-later.md";
  slug: "03-mata-ne-see-you-later";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-more-than-the-wanting.md": {
	id: "03-more-than-the-wanting.md";
  slug: "03-more-than-the-wanting";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-no-strings-attached.md": {
	id: "03-no-strings-attached.md";
  slug: "03-no-strings-attached";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-point-of-no-return.md": {
	id: "03-point-of-no-return.md";
  slug: "03-point-of-no-return";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-ready-set-record.md": {
	id: "03-ready-set-record.md";
  slug: "03-ready-set-record";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-the-5th-and-the-corrupted.md": {
	id: "03-the-5th-and-the-corrupted.md";
  slug: "03-the-5th-and-the-corrupted";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-the-purple-woman.md": {
	id: "03-the-purple-woman.md";
  slug: "03-the-purple-woman";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-the-red-woman.md": {
	id: "03-the-red-woman.md";
  slug: "03-the-red-woman";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-the-seven.md": {
	id: "03-the-seven.md";
  slug: "03-the-seven";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"03-turbulence-unplugged.md": {
	id: "03-turbulence-unplugged.md";
  slug: "03-turbulence-unplugged";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-clear-cache-cookies.md": {
	id: "04-clear-cache-cookies.md";
  slug: "04-clear-cache-cookies";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-cloudy-with-a-chance-of-pain.md": {
	id: "04-cloudy-with-a-chance-of-pain.md";
  slug: "04-cloudy-with-a-chance-of-pain";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-commander-of-one.md": {
	id: "04-commander-of-one.md";
  slug: "04-commander-of-one";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-designated-survivor-unplugged.md": {
	id: "04-designated-survivor-unplugged.md";
  slug: "04-designated-survivor-unplugged";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-ember-transmission.md": {
	id: "04-ember-transmission.md";
  slug: "04-ember-transmission";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-fuck-the-system.md": {
	id: "04-fuck-the-system.md";
  slug: "04-fuck-the-system";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-here-and-there-not-everywhere.md": {
	id: "04-here-and-there-not-everywhere.md";
  slug: "04-here-and-there-not-everywhere";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-incandescent-love-affair.md": {
	id: "04-incandescent-love-affair.md";
  slug: "04-incandescent-love-affair";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-known-by-heart.md": {
	id: "04-known-by-heart.md";
  slug: "04-known-by-heart";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-radical-implosion.md": {
	id: "04-radical-implosion.md";
  slug: "04-radical-implosion";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-road-travelled.md": {
	id: "04-road-travelled.md";
  slug: "04-road-travelled";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-seek-the-light.md": {
	id: "04-seek-the-light.md";
  slug: "04-seek-the-light";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-she-who-inherits.md": {
	id: "04-she-who-inherits.md";
  slug: "04-she-who-inherits";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-sometimes-all-the-time.md": {
	id: "04-sometimes-all-the-time.md";
  slug: "04-sometimes-all-the-time";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-spin-the-bottle.md": {
	id: "04-spin-the-bottle.md";
  slug: "04-spin-the-bottle";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-take-me-away.md": {
	id: "04-take-me-away.md";
  slug: "04-take-me-away";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-the-8th-voice.md": {
	id: "04-the-8th-voice.md";
  slug: "04-the-8th-voice";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-the-lust-in-us.md": {
	id: "04-the-lust-in-us.md";
  slug: "04-the-lust-in-us";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-the-one-you-hold.md": {
	id: "04-the-one-you-hold.md";
  slug: "04-the-one-you-hold";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-the-purple-malice.md": {
	id: "04-the-purple-malice.md";
  slug: "04-the-purple-malice";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-the-red-warrior.md": {
	id: "04-the-red-warrior.md";
  slug: "04-the-red-warrior";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-upgrades-and-improvements.md": {
	id: "04-upgrades-and-improvements.md";
  slug: "04-upgrades-and-improvements";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"04-when-to-seek-help.md": {
	id: "04-when-to-seek-help.md";
  slug: "04-when-to-seek-help";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-blazing-heart.md": {
	id: "05-blazing-heart.md";
  slug: "05-blazing-heart";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-close.md": {
	id: "05-close.md";
  slug: "05-close";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-combustion-reaction.md": {
	id: "05-combustion-reaction.md";
  slug: "05-combustion-reaction";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-dead-upon-arrival.md": {
	id: "05-dead-upon-arrival.md";
  slug: "05-dead-upon-arrival";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-discourse-and-division.md": {
	id: "05-discourse-and-division.md";
  slug: "05-discourse-and-division";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-dreams-of-you-and-me.md": {
	id: "05-dreams-of-you-and-me.md";
  slug: "05-dreams-of-you-and-me";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-fault-lines.md": {
	id: "05-fault-lines.md";
  slug: "05-fault-lines";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-hypothetical-rhetoric.md": {
	id: "05-hypothetical-rhetoric.md";
  slug: "05-hypothetical-rhetoric";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-i-always-say.md": {
	id: "05-i-always-say.md";
  slug: "05-i-always-say";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-insomnia.md": {
	id: "05-insomnia.md";
  slug: "05-insomnia";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-light-or-blight.md": {
	id: "05-light-or-blight.md";
  slug: "05-light-or-blight";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-off-the-wall.md": {
	id: "05-off-the-wall.md";
  slug: "05-off-the-wall";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-ordained-guidance.md": {
	id: "05-ordained-guidance.md";
  slug: "05-ordained-guidance";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-post-its.md": {
	id: "05-post-its.md";
  slug: "05-post-its";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-sagittarius-unplugged.md": {
	id: "05-sagittarius-unplugged.md";
  slug: "05-sagittarius-unplugged";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-square-root-of-forever.md": {
	id: "05-square-root-of-forever.md";
  slug: "05-square-root-of-forever";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-starstruck.md": {
	id: "05-starstruck.md";
  slug: "05-starstruck";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-string-sting.md": {
	id: "05-string-sting.md";
  slug: "05-string-sting";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-what-you-taste.md": {
	id: "05-what-you-taste.md";
  slug: "05-what-you-taste";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-when-the-gods-are-silent.md": {
	id: "05-when-the-gods-are-silent.md";
  slug: "05-when-the-gods-are-silent";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-whispers-of-white.md": {
	id: "05-whispers-of-white.md";
  slug: "05-whispers-of-white";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-wicked-teachings.md": {
	id: "05-wicked-teachings.md";
  slug: "05-wicked-teachings";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"05-yeah-fuck-it-im-doing-this.md": {
	id: "05-yeah-fuck-it-im-doing-this.md";
  slug: "05-yeah-fuck-it-im-doing-this";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-age-of-destruction.md": {
	id: "06-age-of-destruction.md";
  slug: "06-age-of-destruction";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-checkmate-unplugged.md": {
	id: "06-checkmate-unplugged.md";
  slug: "06-checkmate-unplugged";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-children-of-the-light.md": {
	id: "06-children-of-the-light.md";
  slug: "06-children-of-the-light";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-close-encounter-with-the-burning-kind.md": {
	id: "06-close-encounter-with-the-burning-kind.md";
  slug: "06-close-encounter-with-the-burning-kind";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-fak-te.md": {
	id: "06-fak-te.md";
  slug: "06-fak-te";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-fides-fracta.md": {
	id: "06-fides-fracta.md";
  slug: "06-fides-fracta";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-for-the-first-time.md": {
	id: "06-for-the-first-time.md";
  slug: "06-for-the-first-time";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-game-over.md": {
	id: "06-game-over.md";
  slug: "06-game-over";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-gaslighting.md": {
	id: "06-gaslighting.md";
  slug: "06-gaslighting";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-house-of-miracles.md": {
	id: "06-house-of-miracles.md";
  slug: "06-house-of-miracles";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-invisible-me.md": {
	id: "06-invisible-me.md";
  slug: "06-invisible-me";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-mercy.md": {
	id: "06-mercy.md";
  slug: "06-mercy";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-paper-walls.md": {
	id: "06-paper-walls.md";
  slug: "06-paper-walls";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-reality-check.md": {
	id: "06-reality-check.md";
  slug: "06-reality-check";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-rise-of-war.md": {
	id: "06-rise-of-war.md";
  slug: "06-rise-of-war";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-saggitarius.md": {
	id: "06-saggitarius.md";
  slug: "06-saggitarius";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-snow-on-the-beach.md": {
	id: "06-snow-on-the-beach.md";
  slug: "06-snow-on-the-beach";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-stay-the-break-up-song.md": {
	id: "06-stay-the-break-up-song.md";
  slug: "06-stay-the-break-up-song";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-the-legend-of-the-light.md": {
	id: "06-the-legend-of-the-light.md";
  slug: "06-the-legend-of-the-light";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-the-order-of-the-light.md": {
	id: "06-the-order-of-the-light.md";
  slug: "06-the-order-of-the-light";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-the-wrong-beat.md": {
	id: "06-the-wrong-beat.md";
  slug: "06-the-wrong-beat";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-too-late.md": {
	id: "06-too-late.md";
  slug: "06-too-late";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"06-unbroken.md": {
	id: "06-unbroken.md";
  slug: "06-unbroken";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-adina-the-wise.md": {
	id: "07-adina-the-wise.md";
  slug: "07-adina-the-wise";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-book-of-mercy.md": {
	id: "07-book-of-mercy.md";
  slug: "07-book-of-mercy";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-far-sighted.md": {
	id: "07-far-sighted.md";
  slug: "07-far-sighted";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-in-the-heat-of-the-night.md": {
	id: "07-in-the-heat-of-the-night.md";
  slug: "07-in-the-heat-of-the-night";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-leave-the-light-on.md": {
	id: "07-leave-the-light-on.md";
  slug: "07-leave-the-light-on";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-loses-and-gains.md": {
	id: "07-loses-and-gains.md";
  slug: "07-loses-and-gains";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-lowkey-wishing.md": {
	id: "07-lowkey-wishing.md";
  slug: "07-lowkey-wishing";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-nightmares-and-hallucinations.md": {
	id: "07-nightmares-and-hallucinations.md";
  slug: "07-nightmares-and-hallucinations";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-olan-the-brave.md": {
	id: "07-olan-the-brave.md";
  slug: "07-olan-the-brave";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-ordinary.md": {
	id: "07-ordinary.md";
  slug: "07-ordinary";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-overlapping-collateral-damage.md": {
	id: "07-overlapping-collateral-damage.md";
  slug: "07-overlapping-collateral-damage";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-paralysis-analysis.md": {
	id: "07-paralysis-analysis.md";
  slug: "07-paralysis-analysis";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-prometheus.md": {
	id: "07-prometheus.md";
  slug: "07-prometheus";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-soft-landing.md": {
	id: "07-soft-landing.md";
  slug: "07-soft-landing";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-south-scourge.md": {
	id: "07-south-scourge.md";
  slug: "07-south-scourge";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-taken.md": {
	id: "07-taken.md";
  slug: "07-taken";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-the-doors-left-open.md": {
	id: "07-the-doors-left-open.md";
  slug: "07-the-doors-left-open";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-the-faithless-ones.md": {
	id: "07-the-faithless-ones.md";
  slug: "07-the-faithless-ones";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-the-one-you-hold-unplugged.md": {
	id: "07-the-one-you-hold-unplugged.md";
  slug: "07-the-one-you-hold-unplugged";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-this-is-my-sheet.md": {
	id: "07-this-is-my-sheet.md";
  slug: "07-this-is-my-sheet";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-we-can-make-it.md": {
	id: "07-we-can-make-it.md";
  slug: "07-we-can-make-it";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-wifi.md": {
	id: "07-wifi.md";
  slug: "07-wifi";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"07-wrath-of-the-seven.md": {
	id: "07-wrath-of-the-seven.md";
  slug: "07-wrath-of-the-seven";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-233-degrees-celsius.md": {
	id: "08-233-degrees-celsius.md";
  slug: "08-233-degrees-celsius";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-cause-and-effect.md": {
	id: "08-cause-and-effect.md";
  slug: "08-cause-and-effect";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-exclusively-not-yours.md": {
	id: "08-exclusively-not-yours.md";
  slug: "08-exclusively-not-yours";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-faith-that-sees.md": {
	id: "08-faith-that-sees.md";
  slug: "08-faith-that-sees";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-fallen.md": {
	id: "08-fallen.md";
  slug: "08-fallen";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-familiar-stranger.md": {
	id: "08-familiar-stranger.md";
  slug: "08-familiar-stranger";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-gaping-hole.md": {
	id: "08-gaping-hole.md";
  slug: "08-gaping-hole";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-gemini.md": {
	id: "08-gemini.md";
  slug: "08-gemini";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-getting-there.md": {
	id: "08-getting-there.md";
  slug: "08-getting-there";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-im-coming.md": {
	id: "08-im-coming.md";
  slug: "08-im-coming";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-let-there-be-dark.md": {
	id: "08-let-there-be-dark.md";
  slug: "08-let-there-be-dark";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-liar-liar.md": {
	id: "08-liar-liar.md";
  slug: "08-liar-liar";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-loading-bay.md": {
	id: "08-loading-bay.md";
  slug: "08-loading-bay";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-martyrs-of-the-south.md": {
	id: "08-martyrs-of-the-south.md";
  slug: "08-martyrs-of-the-south";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-open-ended-conversations.md": {
	id: "08-open-ended-conversations.md";
  slug: "08-open-ended-conversations";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-ps-ill-see-you-tonight.md": {
	id: "08-ps-ill-see-you-tonight.md";
  slug: "08-ps-ill-see-you-tonight";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-the-crimson-order.md": {
	id: "08-the-crimson-order.md";
  slug: "08-the-crimson-order";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-the-devil-in-the-details.md": {
	id: "08-the-devil-in-the-details.md";
  slug: "08-the-devil-in-the-details";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-the-lighted-of-the-south.md": {
	id: "08-the-lighted-of-the-south.md";
  slug: "08-the-lighted-of-the-south";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-the-pyromaniac-in-me.md": {
	id: "08-the-pyromaniac-in-me.md";
  slug: "08-the-pyromaniac-in-me";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-the-shields-of-war.md": {
	id: "08-the-shields-of-war.md";
  slug: "08-the-shields-of-war";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"08-the-sinful-act-of-denial.md": {
	id: "08-the-sinful-act-of-denial.md";
  slug: "08-the-sinful-act-of-denial";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-attention-depravation.md": {
	id: "09-attention-depravation.md";
  slug: "09-attention-depravation";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-before-the-answer.md": {
	id: "09-before-the-answer.md";
  slug: "09-before-the-answer";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-church-of-conflict.md": {
	id: "09-church-of-conflict.md";
  slug: "09-church-of-conflict";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-coffee-cups-and-silver-spoons.md": {
	id: "09-coffee-cups-and-silver-spoons.md";
  slug: "09-coffee-cups-and-silver-spoons";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-confessions-of-ambivalence.md": {
	id: "09-confessions-of-ambivalence.md";
  slug: "09-confessions-of-ambivalence";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-controlled-burning.md": {
	id: "09-controlled-burning.md";
  slug: "09-controlled-burning";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-cremation.md": {
	id: "09-cremation.md";
  slug: "09-cremation";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-elara-betrayed.md": {
	id: "09-elara-betrayed.md";
  slug: "09-elara-betrayed";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-follow-dawn.md": {
	id: "09-follow-dawn.md";
  slug: "09-follow-dawn";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-forwards-and-backwards.md": {
	id: "09-forwards-and-backwards.md";
  slug: "09-forwards-and-backwards";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-fuchsia-the-last-order.md": {
	id: "09-fuchsia-the-last-order.md";
  slug: "09-fuchsia-the-last-order";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-hooked-on-you.md": {
	id: "09-hooked-on-you.md";
  slug: "09-hooked-on-you";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-magenta-the-last-bastion.md": {
	id: "09-magenta-the-last-bastion.md";
  slug: "09-magenta-the-last-bastion";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-mercys-end.md": {
	id: "09-mercys-end.md";
  slug: "09-mercys-end";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-mistakes-and-oversights.md": {
	id: "09-mistakes-and-oversights.md";
  slug: "09-mistakes-and-oversights";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-never-together.md": {
	id: "09-never-together.md";
  slug: "09-never-together";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-ninth-heaven.md": {
	id: "09-ninth-heaven.md";
  slug: "09-ninth-heaven";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-pride-of-the-seven.md": {
	id: "09-pride-of-the-seven.md";
  slug: "09-pride-of-the-seven";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-professional-hater.md": {
	id: "09-professional-hater.md";
  slug: "09-professional-hater";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-seven-virtues.md": {
	id: "09-seven-virtues.md";
  slug: "09-seven-virtues";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-the-cost-of-goodbyes.md": {
	id: "09-the-cost-of-goodbyes.md";
  slug: "09-the-cost-of-goodbyes";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-the-faceless-man.md": {
	id: "09-the-faceless-man.md";
  slug: "09-the-faceless-man";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"09-the-need-for-seeds.md": {
	id: "09-the-need-for-seeds.md";
  slug: "09-the-need-for-seeds";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-13th-floor.md": {
	id: "10-13th-floor.md";
  slug: "10-13th-floor";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-all-in.md": {
	id: "10-all-in.md";
  slug: "10-all-in";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-confessions-of-a-priest.md": {
	id: "10-confessions-of-a-priest.md";
  slug: "10-confessions-of-a-priest";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-consequences-and-overpreparations.md": {
	id: "10-consequences-and-overpreparations.md";
  slug: "10-consequences-and-overpreparations";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-covenant.md": {
	id: "10-covenant.md";
  slug: "10-covenant";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-cut-the-tape.md": {
	id: "10-cut-the-tape.md";
  slug: "10-cut-the-tape";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-flicker-flicker-north-star.md": {
	id: "10-flicker-flicker-north-star.md";
  slug: "10-flicker-flicker-north-star";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-hisashiburi-infrared.md": {
	id: "10-hisashiburi-infrared.md";
  slug: "10-hisashiburi-infrared";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-polaris.md": {
	id: "10-polaris.md";
  slug: "10-polaris";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-reunion.md": {
	id: "10-reunion.md";
  slug: "10-reunion";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-riders-of-dawn.md": {
	id: "10-riders-of-dawn.md";
  slug: "10-riders-of-dawn";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-scarred-cover-the-crimson-sparks.md": {
	id: "10-scarred-cover-the-crimson-sparks.md";
  slug: "10-scarred-cover-the-crimson-sparks";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-seven-past-three.md": {
	id: "10-seven-past-three.md";
  slug: "10-seven-past-three";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-smoke-and-mirrors.md": {
	id: "10-smoke-and-mirrors.md";
  slug: "10-smoke-and-mirrors";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-sound-check.md": {
	id: "10-sound-check.md";
  slug: "10-sound-check";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-still-we-stand.md": {
	id: "10-still-we-stand.md";
  slug: "10-still-we-stand";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-synchronized-falling.md": {
	id: "10-synchronized-falling.md";
  slug: "10-synchronized-falling";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-take-it-easy.md": {
	id: "10-take-it-easy.md";
  slug: "10-take-it-easy";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-the-nun.md": {
	id: "10-the-nun.md";
  slug: "10-the-nun";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-the-rise.md": {
	id: "10-the-rise.md";
  slug: "10-the-rise";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-through-the-static.md": {
	id: "10-through-the-static.md";
  slug: "10-through-the-static";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-war-of-attrition.md": {
	id: "10-war-of-attrition.md";
  slug: "10-war-of-attrition";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"10-when-the-cradle-falls.md": {
	id: "10-when-the-cradle-falls.md";
  slug: "10-when-the-cradle-falls";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-backdraft.md": {
	id: "11-backdraft.md";
  slug: "11-backdraft";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-bright-lights.md": {
	id: "11-bright-lights.md";
  slug: "11-bright-lights";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-burn-live-and-loud-2026.md": {
	id: "11-burn-live-and-loud-2026.md";
  slug: "11-burn-live-and-loud-2026";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-dancing-under-the-stars.md": {
	id: "11-dancing-under-the-stars.md";
  slug: "11-dancing-under-the-stars";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-daughter-of-time-and-faith.md": {
	id: "11-daughter-of-time-and-faith.md";
  slug: "11-daughter-of-time-and-faith";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-destination-somewhere.md": {
	id: "11-destination-somewhere.md";
  slug: "11-destination-somewhere";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-east-bound.md": {
	id: "11-east-bound.md";
  slug: "11-east-bound";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-firebender.md": {
	id: "11-firebender.md";
  slug: "11-firebender";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-follow-the-raven.md": {
	id: "11-follow-the-raven.md";
  slug: "11-follow-the-raven";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-fuck-queue.md": {
	id: "11-fuck-queue.md";
  slug: "11-fuck-queue";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-identity-crises-silence.md": {
	id: "11-identity-crises-silence.md";
  slug: "11-identity-crises-silence";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-multiverse-of-hearbreak.md": {
	id: "11-multiverse-of-hearbreak.md";
  slug: "11-multiverse-of-hearbreak";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-nananas-and-lalalas.md": {
	id: "11-nananas-and-lalalas.md";
  slug: "11-nananas-and-lalalas";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-nebula.md": {
	id: "11-nebula.md";
  slug: "11-nebula";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-path-less-taken.md": {
	id: "11-path-less-taken.md";
  slug: "11-path-less-taken";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-scarred.md": {
	id: "11-scarred.md";
  slug: "11-scarred";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-the-eye-of-the-storm.md": {
	id: "11-the-eye-of-the-storm.md";
  slug: "11-the-eye-of-the-storm";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-the-last-light.md": {
	id: "11-the-last-light.md";
  slug: "11-the-last-light";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-the-liber-primodius.md": {
	id: "11-the-liber-primodius.md";
  slug: "11-the-liber-primodius";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-the-soul-of-elara-dawn.md": {
	id: "11-the-soul-of-elara-dawn.md";
  slug: "11-the-soul-of-elara-dawn";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-the-space-between.md": {
	id: "11-the-space-between.md";
  slug: "11-the-space-between";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-unipolar.md": {
	id: "11-unipolar.md";
  slug: "11-unipolar";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"11-when-the-world-breathes.md": {
	id: "11-when-the-world-breathes.md";
  slug: "11-when-the-world-breathes";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-1st-mission-the-crimson-five.md": {
	id: "12-1st-mission-the-crimson-five.md";
  slug: "12-1st-mission-the-crimson-five";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-aim-al.md": {
	id: "12-aim-al.md";
  slug: "12-aim-al";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-crash.md": {
	id: "12-crash.md";
  slug: "12-crash";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-elara-dawn.md": {
	id: "12-elara-dawn.md";
  slug: "12-elara-dawn";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-end-of-mercy.md": {
	id: "12-end-of-mercy.md";
  slug: "12-end-of-mercy";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-for-those-who-come-next-special-release.md": {
	id: "12-for-those-who-come-next-special-release.md";
  slug: "12-for-those-who-come-next-special-release";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-if-you-could-see-me-now.md": {
	id: "12-if-you-could-see-me-now.md";
  slug: "12-if-you-could-see-me-now";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-is-this-the-beginning-or-the-end.md": {
	id: "12-is-this-the-beginning-or-the-end.md";
  slug: "12-is-this-the-beginning-or-the-end";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-means-of-egress.md": {
	id: "12-means-of-egress.md";
  slug: "12-means-of-egress";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-new-covenant.md": {
	id: "12-new-covenant.md";
  slug: "12-new-covenant";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-pandora-raven.md": {
	id: "12-pandora-raven.md";
  slug: "12-pandora-raven";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-polaris-ii.md": {
	id: "12-polaris-ii.md";
  slug: "12-polaris-ii";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-preflight.md": {
	id: "12-preflight.md";
  slug: "12-preflight";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-signal.md": {
	id: "12-signal.md";
  slug: "12-signal";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-sleep-tight.md": {
	id: "12-sleep-tight.md";
  slug: "12-sleep-tight";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-static.md": {
	id: "12-static.md";
  slug: "12-static";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-still-we-stand-live-and-loud-2026.md": {
	id: "12-still-we-stand-live-and-loud-2026.md";
  slug: "12-still-we-stand-live-and-loud-2026";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-taken-unplugged.md": {
	id: "12-taken-unplugged.md";
  slug: "12-taken-unplugged";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-the-first-light.md": {
	id: "12-the-first-light.md";
  slug: "12-the-first-light";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-the-tower.md": {
	id: "12-the-tower.md";
  slug: "12-the-tower";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-theories.md": {
	id: "12-theories.md";
  slug: "12-theories";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-turbulence.md": {
	id: "12-turbulence.md";
  slug: "12-turbulence";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"12-wheels-up.md": {
	id: "12-wheels-up.md";
  slug: "12-wheels-up";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"13-auto-in-live-and-loud-2026.md": {
	id: "13-auto-in-live-and-loud-2026.md";
  slug: "13-auto-in-live-and-loud-2026";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"13-this-fucking-beer.md": {
	id: "13-this-fucking-beer.md";
  slug: "13-this-fucking-beer";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"14-the-legend-of-the-mosquito-hating-guy.md": {
	id: "14-the-legend-of-the-mosquito-hating-guy.md";
  slug: "14-the-legend-of-the-mosquito-hating-guy";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"15-vacationing.md": {
	id: "15-vacationing.md";
  slug: "15-vacationing";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"16-the-art-of-social-climbing.md": {
	id: "16-the-art-of-social-climbing.md";
  slug: "16-the-art-of-social-climbing";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"17-halle-fucking-lujah.md": {
	id: "17-halle-fucking-lujah.md";
  slug: "17-halle-fucking-lujah";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"18-mr-sunshine.md": {
	id: "18-mr-sunshine.md";
  slug: "18-mr-sunshine";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"19-swipe-right.md": {
	id: "19-swipe-right.md";
  slug: "19-swipe-right";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"20-a-fucking-love-song.md": {
	id: "20-a-fucking-love-song.md";
  slug: "20-a-fucking-love-song";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"21-her-fucking-list.md": {
	id: "21-her-fucking-list.md";
  slug: "21-her-fucking-list";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"22-food-pictures.md": {
	id: "22-food-pictures.md";
  slug: "22-food-pictures";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"23-it-could-have-been-love.md": {
	id: "23-it-could-have-been-love.md";
  slug: "23-it-could-have-been-love";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"24-out-with-friends.md": {
	id: "24-out-with-friends.md";
  slug: "24-out-with-friends";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"25-the-missing-87-seconds.md": {
	id: "25-the-missing-87-seconds.md";
  slug: "25-the-missing-87-seconds";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"26-did-i-gain-weight.md": {
	id: "26-did-i-gain-weight.md";
  slug: "26-did-i-gain-weight";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"27-stay-away.md": {
	id: "27-stay-away.md";
  slug: "27-stay-away";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"28-stay-go-i-dont-know.md": {
	id: "28-stay-go-i-dont-know.md";
  slug: "28-stay-go-i-dont-know";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"29-should-have-been-me.md": {
	id: "29-should-have-been-me.md";
  slug: "29-should-have-been-me";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"30-the-space-you-left.md": {
	id: "30-the-space-you-left.md";
  slug: "30-the-space-you-left";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"31-your-eyes.md": {
	id: "31-your-eyes.md";
  slug: "31-your-eyes";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"32-thank-you-and-fuck-you.md": {
	id: "32-thank-you-and-fuck-you.md";
  slug: "32-thank-you-and-fuck-you";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"a-road-less-travelled.md": {
	id: "a-road-less-travelled.md";
  slug: "a-road-less-travelled";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"a-world-without-witness.md": {
	id: "a-world-without-witness.md";
  slug: "a-world-without-witness";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"blind-faith.md": {
	id: "blind-faith.md";
  slug: "blind-faith";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"blinding-silhouette.md": {
	id: "blinding-silhouette.md";
  slug: "blinding-silhouette";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"book-of-jezebel.md": {
	id: "book-of-jezebel.md";
  slug: "book-of-jezebel";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"child-of-light.md": {
	id: "child-of-light.md";
  slug: "child-of-light";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"church-of-ruin.md": {
	id: "church-of-ruin.md";
  slug: "church-of-ruin";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"conflict-within.md": {
	id: "conflict-within.md";
  slug: "conflict-within";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"contented-torments.md": {
	id: "contented-torments.md";
  slug: "contented-torments";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"corridors-and-spirals.md": {
	id: "corridors-and-spirals.md";
  slug: "corridors-and-spirals";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"corrupted.md": {
	id: "corrupted.md";
  slug: "corrupted";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"crimson-haired-light.md": {
	id: "crimson-haired-light.md";
  slug: "crimson-haired-light";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"dark-trinity.md": {
	id: "dark-trinity.md";
  slug: "dark-trinity";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a1-01-fox-this-life.md": {
	id: "defective-detective-a1-01-fox-this-life.md";
  slug: "defective-detective-a1-01-fox-this-life";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a1-02-procedural-nonsense.md": {
	id: "defective-detective-a1-02-procedural-nonsense.md";
  slug: "defective-detective-a1-02-procedural-nonsense";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a1-03-andy-the-duende.md": {
	id: "defective-detective-a1-03-andy-the-duende.md";
  slug: "defective-detective-a1-03-andy-the-duende";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a1-04-photographic-panoramic.md": {
	id: "defective-detective-a1-04-photographic-panoramic.md";
  slug: "defective-detective-a1-04-photographic-panoramic";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a1-05-colorblind.md": {
	id: "defective-detective-a1-05-colorblind.md";
  slug: "defective-detective-a1-05-colorblind";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a1-06-loaded-and-coded.md": {
	id: "defective-detective-a1-06-loaded-and-coded.md";
  slug: "defective-detective-a1-06-loaded-and-coded";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a1-07-in-the-company-of-strangers.md": {
	id: "defective-detective-a1-07-in-the-company-of-strangers.md";
  slug: "defective-detective-a1-07-in-the-company-of-strangers";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a1-08-perimeter-limiter.md": {
	id: "defective-detective-a1-08-perimeter-limiter.md";
  slug: "defective-detective-a1-08-perimeter-limiter";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a1-09-platinum-8.md": {
	id: "defective-detective-a1-09-platinum-8.md";
  slug: "defective-detective-a1-09-platinum-8";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a1-10-zoom.md": {
	id: "defective-detective-a1-10-zoom.md";
  slug: "defective-detective-a1-10-zoom";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a1-11-auto-detection-mode.md": {
	id: "defective-detective-a1-11-auto-detection-mode.md";
  slug: "defective-detective-a1-11-auto-detection-mode";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a1-12-the-message-and-the-code.md": {
	id: "defective-detective-a1-12-the-message-and-the-code.md";
  slug: "defective-detective-a1-12-the-message-and-the-code";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a2-01-the-fox-and-the-rest.md": {
	id: "defective-detective-a2-01-the-fox-and-the-rest.md";
  slug: "defective-detective-a2-01-the-fox-and-the-rest";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a2-02-spray-and-pray.md": {
	id: "defective-detective-a2-02-spray-and-pray.md";
  slug: "defective-detective-a2-02-spray-and-pray";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a2-03-colorless-love.md": {
	id: "defective-detective-a2-03-colorless-love.md";
  slug: "defective-detective-a2-03-colorless-love";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a2-04-category-inventory.md": {
	id: "defective-detective-a2-04-category-inventory.md";
  slug: "defective-detective-a2-04-category-inventory";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a2-05-sit-stay-sleep-comply-reflect.md": {
	id: "defective-detective-a2-05-sit-stay-sleep-comply-reflect.md";
  slug: "defective-detective-a2-05-sit-stay-sleep-comply-reflect";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a2-06-black-is-beautiful.md": {
	id: "defective-detective-a2-06-black-is-beautiful.md";
  slug: "defective-detective-a2-06-black-is-beautiful";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a2-07-dont-mess-with-nessa.md": {
	id: "defective-detective-a2-07-dont-mess-with-nessa.md";
  slug: "defective-detective-a2-07-dont-mess-with-nessa";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a2-08-executive-decision.md": {
	id: "defective-detective-a2-08-executive-decision.md";
  slug: "defective-detective-a2-08-executive-decision";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a2-09-2nd-place-is-fine.md": {
	id: "defective-detective-a2-09-2nd-place-is-fine.md";
  slug: "defective-detective-a2-09-2nd-place-is-fine";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a2-10-chasing-shadows.md": {
	id: "defective-detective-a2-10-chasing-shadows.md";
  slug: "defective-detective-a2-10-chasing-shadows";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a2-11-the-color-of-rage.md": {
	id: "defective-detective-a2-11-the-color-of-rage.md";
  slug: "defective-detective-a2-11-the-color-of-rage";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a2-12-nyan-cast.md": {
	id: "defective-detective-a2-12-nyan-cast.md";
  slug: "defective-detective-a2-12-nyan-cast";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a3-01-for-fox-sakes.md": {
	id: "defective-detective-a3-01-for-fox-sakes.md";
  slug: "defective-detective-a3-01-for-fox-sakes";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a3-02-serah-solves.md": {
	id: "defective-detective-a3-02-serah-solves.md";
  slug: "defective-detective-a3-02-serah-solves";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a3-03-keemaro-and-sons.md": {
	id: "defective-detective-a3-03-keemaro-and-sons.md";
  slug: "defective-detective-a3-03-keemaro-and-sons";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a3-04-single-and-ready-to-mingle.md": {
	id: "defective-detective-a3-04-single-and-ready-to-mingle.md";
  slug: "defective-detective-a3-04-single-and-ready-to-mingle";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a3-05-dreams-of-rainbows.md": {
	id: "defective-detective-a3-05-dreams-of-rainbows.md";
  slug: "defective-detective-a3-05-dreams-of-rainbows";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a3-06-artifacts-and-contracts.md": {
	id: "defective-detective-a3-06-artifacts-and-contracts.md";
  slug: "defective-detective-a3-06-artifacts-and-contracts";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a3-07-where-does-this-go.md": {
	id: "defective-detective-a3-07-where-does-this-go.md";
  slug: "defective-detective-a3-07-where-does-this-go";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a3-08-station-thirty-three.md": {
	id: "defective-detective-a3-08-station-thirty-three.md";
  slug: "defective-detective-a3-08-station-thirty-three";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a3-09-orange.md": {
	id: "defective-detective-a3-09-orange.md";
  slug: "defective-detective-a3-09-orange";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a3-10-red-and-ready.md": {
	id: "defective-detective-a3-10-red-and-ready.md";
  slug: "defective-detective-a3-10-red-and-ready";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a3-11-the-rise.md": {
	id: "defective-detective-a3-11-the-rise.md";
  slug: "defective-detective-a3-11-the-rise";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a3-12-crimson.md": {
	id: "defective-detective-a3-12-crimson.md";
  slug: "defective-detective-a3-12-crimson";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a4-01-what-the-fox.md": {
	id: "defective-detective-a4-01-what-the-fox.md";
  slug: "defective-detective-a4-01-what-the-fox";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a4-02-guitar-strings-and-nanten-tears.md": {
	id: "defective-detective-a4-02-guitar-strings-and-nanten-tears.md";
  slug: "defective-detective-a4-02-guitar-strings-and-nanten-tears";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a4-03-night-night-sleep-tight.md": {
	id: "defective-detective-a4-03-night-night-sleep-tight.md";
  slug: "defective-detective-a4-03-night-night-sleep-tight";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a4-04-the-street-knows-your-names.md": {
	id: "defective-detective-a4-04-the-street-knows-your-names.md";
  slug: "defective-detective-a4-04-the-street-knows-your-names";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a4-05-information-is-power.md": {
	id: "defective-detective-a4-05-information-is-power.md";
  slug: "defective-detective-a4-05-information-is-power";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a4-06-back-on-the-air.md": {
	id: "defective-detective-a4-06-back-on-the-air.md";
  slug: "defective-detective-a4-06-back-on-the-air";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a4-07-the-meaning-of-purple.md": {
	id: "defective-detective-a4-07-the-meaning-of-purple.md";
  slug: "defective-detective-a4-07-the-meaning-of-purple";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a4-08-paws-forward.md": {
	id: "defective-detective-a4-08-paws-forward.md";
  slug: "defective-detective-a4-08-paws-forward";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a4-09-the-keemaro-connection.md": {
	id: "defective-detective-a4-09-the-keemaro-connection.md";
  slug: "defective-detective-a4-09-the-keemaro-connection";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a4-10-gadgets-and-heartbreaks.md": {
	id: "defective-detective-a4-10-gadgets-and-heartbreaks.md";
  slug: "defective-detective-a4-10-gadgets-and-heartbreaks";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a4-11-fox-hunt.md": {
	id: "defective-detective-a4-11-fox-hunt.md";
  slug: "defective-detective-a4-11-fox-hunt";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a4-12-the-defective-detectives.md": {
	id: "defective-detective-a4-12-the-defective-detectives.md";
  slug: "defective-detective-a4-12-the-defective-detectives";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a5-01-how-the-fox-did-this-happen.md": {
	id: "defective-detective-a5-01-how-the-fox-did-this-happen.md";
  slug: "defective-detective-a5-01-how-the-fox-did-this-happen";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a5-02-missions-decisions.md": {
	id: "defective-detective-a5-02-missions-decisions.md";
  slug: "defective-detective-a5-02-missions-decisions";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a5-03-focus-chorus.md": {
	id: "defective-detective-a5-03-focus-chorus.md";
  slug: "defective-detective-a5-03-focus-chorus";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a5-04-back-in-black.md": {
	id: "defective-detective-a5-04-back-in-black.md";
  slug: "defective-detective-a5-04-back-in-black";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a5-05-bare-bear.md": {
	id: "defective-detective-a5-05-bare-bear.md";
  slug: "defective-detective-a5-05-bare-bear";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a5-06-the-intern.md": {
	id: "defective-detective-a5-06-the-intern.md";
  slug: "defective-detective-a5-06-the-intern";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a5-07-purple-pain.md": {
	id: "defective-detective-a5-07-purple-pain.md";
  slug: "defective-detective-a5-07-purple-pain";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a5-08-tails-and-wires.md": {
	id: "defective-detective-a5-08-tails-and-wires.md";
  slug: "defective-detective-a5-08-tails-and-wires";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a5-09-a-helpful-kelpie.md": {
	id: "defective-detective-a5-09-a-helpful-kelpie.md";
  slug: "defective-detective-a5-09-a-helpful-kelpie";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a5-10-a-song-from-me-to-you.md": {
	id: "defective-detective-a5-10-a-song-from-me-to-you.md";
  slug: "defective-detective-a5-10-a-song-from-me-to-you";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a5-11-cryptic-clinic.md": {
	id: "defective-detective-a5-11-cryptic-clinic.md";
  slug: "defective-detective-a5-11-cryptic-clinic";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"defective-detective-a5-12-fox-hunt-2.md": {
	id: "defective-detective-a5-12-fox-hunt-2.md";
  slug: "defective-detective-a5-12-fox-hunt-2";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"die-lullaby.md": {
	id: "die-lullaby.md";
  slug: "die-lullaby";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"down-is-up.md": {
	id: "down-is-up.md";
  slug: "down-is-up";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"east-rising.md": {
	id: "east-rising.md";
  slug: "east-rising";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"elara-08-the-morning-after.md": {
	id: "elara-08-the-morning-after.md";
  slug: "elara-08-the-morning-after";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"familiar-feelings.md": {
	id: "familiar-feelings.md";
  slug: "familiar-feelings";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"femme-fatale.md": {
	id: "femme-fatale.md";
  slug: "femme-fatale";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"flawless-design.md": {
	id: "flawless-design.md";
  slug: "flawless-design";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"flight-of-the-raven.md": {
	id: "flight-of-the-raven.md";
  slug: "flight-of-the-raven";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"forbidden-fruit.md": {
	id: "forbidden-fruit.md";
  slug: "forbidden-fruit";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"her-malevolence.md": {
	id: "her-malevolence.md";
  slug: "her-malevolence";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"hide-and-seek.md": {
	id: "hide-and-seek.md";
  slug: "hide-and-seek";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"holy-poison.md": {
	id: "holy-poison.md";
  slug: "holy-poison";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"homebound.md": {
	id: "homebound.md";
  slug: "homebound";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"hopes-desperate-end.md": {
	id: "hopes-desperate-end.md";
  slug: "hopes-desperate-end";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"i-lust-you.md": {
	id: "i-lust-you.md";
  slug: "i-lust-you";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"is-this-the-end-of-the-beginning.md": {
	id: "is-this-the-end-of-the-beginning.md";
  slug: "is-this-the-end-of-the-beginning";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"kiss-of-death.md": {
	id: "kiss-of-death.md";
  slug: "kiss-of-death";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"let-me-in.md": {
	id: "let-me-in.md";
  slug: "let-me-in";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"light-bringer.md": {
	id: "light-bringer.md";
  slug: "light-bringer";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"lost-and-confused.md": {
	id: "lost-and-confused.md";
  slug: "lost-and-confused";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"marionettes-and-puppets.md": {
	id: "marionettes-and-puppets.md";
  slug: "marionettes-and-puppets";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"mist-of-ruination.md": {
	id: "mist-of-ruination.md";
  slug: "mist-of-ruination";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"no-one-left-to-answer.md": {
	id: "no-one-left-to-answer.md";
  slug: "no-one-left-to-answer";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"pandora-says.md": {
	id: "pandora-says.md";
  slug: "pandora-says";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"pandoras-box-of-forgotten-things.md": {
	id: "pandoras-box-of-forgotten-things.md";
  slug: "pandoras-box-of-forgotten-things";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"pandoras-box-of-little-horrors.md": {
	id: "pandoras-box-of-little-horrors.md";
  slug: "pandoras-box-of-little-horrors";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"path-to-salvation.md": {
	id: "path-to-salvation.md";
  slug: "path-to-salvation";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"poison-caution.md": {
	id: "poison-caution.md";
  slug: "poison-caution";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"polaris-ii.md": {
	id: "polaris-ii.md";
  slug: "polaris-ii";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver10-01-update-day.md": {
	id: "prima-timo-ver10-01-update-day.md";
  slug: "prima-timo-ver10-01-update-day";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver10-02-bus-transfer.md": {
	id: "prima-timo-ver10-02-bus-transfer.md";
  slug: "prima-timo-ver10-02-bus-transfer";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver10-03-on-mute.md": {
	id: "prima-timo-ver10-03-on-mute.md";
  slug: "prima-timo-ver10-03-on-mute";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver10-04-the-boy-and-the-machine.md": {
	id: "prima-timo-ver10-04-the-boy-and-the-machine.md";
  slug: "prima-timo-ver10-04-the-boy-and-the-machine";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver10-05-technically-speaking.md": {
	id: "prima-timo-ver10-05-technically-speaking.md";
  slug: "prima-timo-ver10-05-technically-speaking";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver10-06-revolution-evolution.md": {
	id: "prima-timo-ver10-06-revolution-evolution.md";
  slug: "prima-timo-ver10-06-revolution-evolution";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver10-07-a-glitch-in-time.md": {
	id: "prima-timo-ver10-07-a-glitch-in-time.md";
  slug: "prima-timo-ver10-07-a-glitch-in-time";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver10-08-mechanical-malfunction.md": {
	id: "prima-timo-ver10-08-mechanical-malfunction.md";
  slug: "prima-timo-ver10-08-mechanical-malfunction";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver10-09-under-the-same-moon.md": {
	id: "prima-timo-ver10-09-under-the-same-moon.md";
  slug: "prima-timo-ver10-09-under-the-same-moon";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver10-10-ronnie-the-robot.md": {
	id: "prima-timo-ver10-10-ronnie-the-robot.md";
  slug: "prima-timo-ver10-10-ronnie-the-robot";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver10-11-upgrades-or-improvements.md": {
	id: "prima-timo-ver10-11-upgrades-or-improvements.md";
  slug: "prima-timo-ver10-11-upgrades-or-improvements";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver10-12-viral-updates.md": {
	id: "prima-timo-ver10-12-viral-updates.md";
  slug: "prima-timo-ver10-12-viral-updates";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver20-01-lost-and-found.md": {
	id: "prima-timo-ver20-01-lost-and-found.md";
  slug: "prima-timo-ver20-01-lost-and-found";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver20-02-selection-day.md": {
	id: "prima-timo-ver20-02-selection-day.md";
  slug: "prima-timo-ver20-02-selection-day";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver20-03-pieces-of-everything.md": {
	id: "prima-timo-ver20-03-pieces-of-everything.md";
  slug: "prima-timo-ver20-03-pieces-of-everything";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver20-04-the-machine-and-the-boy.md": {
	id: "prima-timo-ver20-04-the-machine-and-the-boy.md";
  slug: "prima-timo-ver20-04-the-machine-and-the-boy";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver20-05-reality-check.md": {
	id: "prima-timo-ver20-05-reality-check.md";
  slug: "prima-timo-ver20-05-reality-check";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver20-06-rise-of-the-machines.md": {
	id: "prima-timo-ver20-06-rise-of-the-machines.md";
  slug: "prima-timo-ver20-06-rise-of-the-machines";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver20-07-the-break-room.md": {
	id: "prima-timo-ver20-07-the-break-room.md";
  slug: "prima-timo-ver20-07-the-break-room";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver20-08-where-are-you.md": {
	id: "prima-timo-ver20-08-where-are-you.md";
  slug: "prima-timo-ver20-08-where-are-you";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver20-09-the-moon-light.md": {
	id: "prima-timo-ver20-09-the-moon-light.md";
  slug: "prima-timo-ver20-09-the-moon-light";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver20-10-a-shimmer-in-time.md": {
	id: "prima-timo-ver20-10-a-shimmer-in-time.md";
  slug: "prima-timo-ver20-10-a-shimmer-in-time";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver20-11-sale-50-off.md": {
	id: "prima-timo-ver20-11-sale-50-off.md";
  slug: "prima-timo-ver20-11-sale-50-off";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver20-12-emergency-broadcast.md": {
	id: "prima-timo-ver20-12-emergency-broadcast.md";
  slug: "prima-timo-ver20-12-emergency-broadcast";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver30-01-version-3.md": {
	id: "prima-timo-ver30-01-version-3.md";
  slug: "prima-timo-ver30-01-version-3";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver30-02-ronnie-the-anomaly.md": {
	id: "prima-timo-ver30-02-ronnie-the-anomaly.md";
  slug: "prima-timo-ver30-02-ronnie-the-anomaly";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver30-03-under-under-and-under.md": {
	id: "prima-timo-ver30-03-under-under-and-under.md";
  slug: "prima-timo-ver30-03-under-under-and-under";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver30-04-road-trip.md": {
	id: "prima-timo-ver30-04-road-trip.md";
  slug: "prima-timo-ver30-04-road-trip";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver30-05-broken-and-bent.md": {
	id: "prima-timo-ver30-05-broken-and-bent.md";
  slug: "prima-timo-ver30-05-broken-and-bent";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver30-06-hallucinations-and-perceptions.md": {
	id: "prima-timo-ver30-06-hallucinations-and-perceptions.md";
  slug: "prima-timo-ver30-06-hallucinations-and-perceptions";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver30-07-not-shiny-not-new.md": {
	id: "prima-timo-ver30-07-not-shiny-not-new.md";
  slug: "prima-timo-ver30-07-not-shiny-not-new";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver30-08-a-promise-to-return.md": {
	id: "prima-timo-ver30-08-a-promise-to-return.md";
  slug: "prima-timo-ver30-08-a-promise-to-return";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver30-09-veera-the-queen.md": {
	id: "prima-timo-ver30-09-veera-the-queen.md";
  slug: "prima-timo-ver30-09-veera-the-queen";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver30-10-a-beautiful-design.md": {
	id: "prima-timo-ver30-10-a-beautiful-design.md";
  slug: "prima-timo-ver30-10-a-beautiful-design";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver30-11-kai-is-the-guy.md": {
	id: "prima-timo-ver30-11-kai-is-the-guy.md";
  slug: "prima-timo-ver30-11-kai-is-the-guy";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver30-12-blue-bananas.md": {
	id: "prima-timo-ver30-12-blue-bananas.md";
  slug: "prima-timo-ver30-12-blue-bananas";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver40-01-the-red-room.md": {
	id: "prima-timo-ver40-01-the-red-room.md";
  slug: "prima-timo-ver40-01-the-red-room";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver40-02-biomimicry.md": {
	id: "prima-timo-ver40-02-biomimicry.md";
  slug: "prima-timo-ver40-02-biomimicry";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver40-03-inventory-story.md": {
	id: "prima-timo-ver40-03-inventory-story.md";
  slug: "prima-timo-ver40-03-inventory-story";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver40-04-toast.md": {
	id: "prima-timo-ver40-04-toast.md";
  slug: "prima-timo-ver40-04-toast";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver40-05-super-genius.md": {
	id: "prima-timo-ver40-05-super-genius.md";
  slug: "prima-timo-ver40-05-super-genius";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver40-06-talking.md": {
	id: "prima-timo-ver40-06-talking.md";
  slug: "prima-timo-ver40-06-talking";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver40-07-she-s-perfect.md": {
	id: "prima-timo-ver40-07-she-s-perfect.md";
  slug: "prima-timo-ver40-07-she-s-perfect";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver40-08-primatown.md": {
	id: "prima-timo-ver40-08-primatown.md";
  slug: "prima-timo-ver40-08-primatown";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver40-09-atten-ten-ten-tion-please.md": {
	id: "prima-timo-ver40-09-atten-ten-ten-tion-please.md";
  slug: "prima-timo-ver40-09-atten-ten-ten-tion-please";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver40-10-wait-one-more-time.md": {
	id: "prima-timo-ver40-10-wait-one-more-time.md";
  slug: "prima-timo-ver40-10-wait-one-more-time";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver40-11-prima-give-me-your-hand.md": {
	id: "prima-timo-ver40-11-prima-give-me-your-hand.md";
  slug: "prima-timo-ver40-11-prima-give-me-your-hand";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver40-12-data-overload.md": {
	id: "prima-timo-ver40-12-data-overload.md";
  slug: "prima-timo-ver40-12-data-overload";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver50-01-the-cost-of-growth.md": {
	id: "prima-timo-ver50-01-the-cost-of-growth.md";
  slug: "prima-timo-ver50-01-the-cost-of-growth";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver50-02-flora-and-fauna.md": {
	id: "prima-timo-ver50-02-flora-and-fauna.md";
  slug: "prima-timo-ver50-02-flora-and-fauna";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver50-03-bernard.md": {
	id: "prima-timo-ver50-03-bernard.md";
  slug: "prima-timo-ver50-03-bernard";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver50-04-lalala-lalala.md": {
	id: "prima-timo-ver50-04-lalala-lalala.md";
  slug: "prima-timo-ver50-04-lalala-lalala";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver50-05-echoing-vast-chamber-soft-glowing-hum.md": {
	id: "prima-timo-ver50-05-echoing-vast-chamber-soft-glowing-hum.md";
  slug: "prima-timo-ver50-05-echoing-vast-chamber-soft-glowing-hum";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver50-06-the-night-before-the-break.md": {
	id: "prima-timo-ver50-06-the-night-before-the-break.md";
  slug: "prima-timo-ver50-06-the-night-before-the-break";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver50-07-documented-obsession.md": {
	id: "prima-timo-ver50-07-documented-obsession.md";
  slug: "prima-timo-ver50-07-documented-obsession";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver50-08-begin.md": {
	id: "prima-timo-ver50-08-begin.md";
  slug: "prima-timo-ver50-08-begin";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver50-09-they-just-want-to-survive.md": {
	id: "prima-timo-ver50-09-they-just-want-to-survive.md";
  slug: "prima-timo-ver50-09-they-just-want-to-survive";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver50-10-the-morning-after.md": {
	id: "prima-timo-ver50-10-the-morning-after.md";
  slug: "prima-timo-ver50-10-the-morning-after";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver50-11-now.md": {
	id: "prima-timo-ver50-11-now.md";
  slug: "prima-timo-ver50-11-now";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver50-12-the-last-bastion.md": {
	id: "prima-timo-ver50-12-the-last-bastion.md";
  slug: "prima-timo-ver50-12-the-last-bastion";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver60-01-let-s-go.md": {
	id: "prima-timo-ver60-01-let-s-go.md";
  slug: "prima-timo-ver60-01-let-s-go";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver60-02-water-gates.md": {
	id: "prima-timo-ver60-02-water-gates.md";
  slug: "prima-timo-ver60-02-water-gates";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver60-03-and-a-man.md": {
	id: "prima-timo-ver60-03-and-a-man.md";
  slug: "prima-timo-ver60-03-and-a-man";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver60-04-i-love-his-name.md": {
	id: "prima-timo-ver60-04-i-love-his-name.md";
  slug: "prima-timo-ver60-04-i-love-his-name";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver60-05-ok-let-s-look-around.md": {
	id: "prima-timo-ver60-05-ok-let-s-look-around.md";
  slug: "prima-timo-ver60-05-ok-let-s-look-around";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver60-06-we-need-to-make-sure-we-keep-this-town-safe-for-them-to-have-a-place-to-comeback-to.md": {
	id: "prima-timo-ver60-06-we-need-to-make-sure-we-keep-this-town-safe-for-them-to-have-a-place-to-comeback-to.md";
  slug: "prima-timo-ver60-06-we-need-to-make-sure-we-keep-this-town-safe-for-them-to-have-a-place-to-comeback-to";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver60-07-then-they-arrive.md": {
	id: "prima-timo-ver60-07-then-they-arrive.md";
  slug: "prima-timo-ver60-07-then-they-arrive";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver60-08-the-submarine-who-cares.md": {
	id: "prima-timo-ver60-08-the-submarine-who-cares.md";
  slug: "prima-timo-ver60-08-the-submarine-who-cares";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver60-09-to-make-sure-teemo-and-crew-will-be-nourished-through-this-journey.md": {
	id: "prima-timo-ver60-09-to-make-sure-teemo-and-crew-will-be-nourished-through-this-journey.md";
  slug: "prima-timo-ver60-09-to-make-sure-teemo-and-crew-will-be-nourished-through-this-journey";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver60-10-vellum.md": {
	id: "prima-timo-ver60-10-vellum.md";
  slug: "prima-timo-ver60-10-vellum";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver60-11-gate-17.md": {
	id: "prima-timo-ver60-11-gate-17.md";
  slug: "prima-timo-ver60-11-gate-17";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver60-12-the-seas-are-angry-it-seems.md": {
	id: "prima-timo-ver60-12-the-seas-are-angry-it-seems.md";
  slug: "prima-timo-ver60-12-the-seas-are-angry-it-seems";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver70-01-when-will-the-dream-become-real.md": {
	id: "prima-timo-ver70-01-when-will-the-dream-become-real.md";
  slug: "prima-timo-ver70-01-when-will-the-dream-become-real";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver70-02-unannounced-as-usual.md": {
	id: "prima-timo-ver70-02-unannounced-as-usual.md";
  slug: "prima-timo-ver70-02-unannounced-as-usual";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver70-03-i-have-a-new-appreciation-for-timo.md": {
	id: "prima-timo-ver70-03-i-have-a-new-appreciation-for-timo.md";
  slug: "prima-timo-ver70-03-i-have-a-new-appreciation-for-timo";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver70-04-underneath-the-falls.md": {
	id: "prima-timo-ver70-04-underneath-the-falls.md";
  slug: "prima-timo-ver70-04-underneath-the-falls";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver70-05-we-sometimes-forget-we-are-under-the-earth.md": {
	id: "prima-timo-ver70-05-we-sometimes-forget-we-are-under-the-earth.md";
  slug: "prima-timo-ver70-05-we-sometimes-forget-we-are-under-the-earth";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver70-06-beyond-the-world-below.md": {
	id: "prima-timo-ver70-06-beyond-the-world-below.md";
  slug: "prima-timo-ver70-06-beyond-the-world-below";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver70-07-an-adventure-of-a-vendo-machine.md": {
	id: "prima-timo-ver70-07-an-adventure-of-a-vendo-machine.md";
  slug: "prima-timo-ver70-07-an-adventure-of-a-vendo-machine";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver70-08-of-cores-it-matter.md": {
	id: "prima-timo-ver70-08-of-cores-it-matter.md";
  slug: "prima-timo-ver70-08-of-cores-it-matter";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver70-09-the-weehard-and-the-crew.md": {
	id: "prima-timo-ver70-09-the-weehard-and-the-crew.md";
  slug: "prima-timo-ver70-09-the-weehard-and-the-crew";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver70-10-insufficient-data.md": {
	id: "prima-timo-ver70-10-insufficient-data.md";
  slug: "prima-timo-ver70-10-insufficient-data";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver70-11-keep-it-down.md": {
	id: "prima-timo-ver70-11-keep-it-down.md";
  slug: "prima-timo-ver70-11-keep-it-down";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"prima-timo-ver70-12-stoney-family.md": {
	id: "prima-timo-ver70-12-stoney-family.md";
  slug: "prima-timo-ver70-12-stoney-family";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"purple-gaze.md": {
	id: "purple-gaze.md";
  slug: "purple-gaze";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"quiet-in-the-chaos.md": {
	id: "quiet-in-the-chaos.md";
  slug: "quiet-in-the-chaos";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"raven-flight.md": {
	id: "raven-flight.md";
  slug: "raven-flight";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"rings-of-destiny.md": {
	id: "rings-of-destiny.md";
  slug: "rings-of-destiny";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"road-to-redemption.md": {
	id: "road-to-redemption.md";
  slug: "road-to-redemption";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"road-to-ruin.md": {
	id: "road-to-ruin.md";
  slug: "road-to-ruin";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"run-away.md": {
	id: "run-away.md";
  slug: "run-away";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"scream-dream.md": {
	id: "scream-dream.md";
  slug: "scream-dream";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"screams-of-crimson.md": {
	id: "screams-of-crimson.md";
  slug: "screams-of-crimson";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"sede-vacante.md": {
	id: "sede-vacante.md";
  slug: "sede-vacante";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"sigma-octantis.md": {
	id: "sigma-octantis.md";
  slug: "sigma-octantis";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"sinister.md": {
	id: "sinister.md";
  slug: "sinister";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"six-ticks-to-six.md": {
	id: "six-ticks-to-six.md";
  slug: "six-ticks-to-six";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"smitten.md": {
	id: "smitten.md";
  slug: "smitten";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.0-01-solara.md": {
	id: "solara-ver9.0-01-solara.md";
  slug: "solara-ver90-01-solara";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.0-02-new-cosmic-order.md": {
	id: "solara-ver9.0-02-new-cosmic-order.md";
  slug: "solara-ver90-02-new-cosmic-order";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.0-03-the-weight-of-it-all.md": {
	id: "solara-ver9.0-03-the-weight-of-it-all.md";
  slug: "solara-ver90-03-the-weight-of-it-all";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.0-04-old-religion.md": {
	id: "solara-ver9.0-04-old-religion.md";
  slug: "solara-ver90-04-old-religion";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.0-05-remnants-of-the-past.md": {
	id: "solara-ver9.0-05-remnants-of-the-past.md";
  slug: "solara-ver90-05-remnants-of-the-past";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.0-06-end-of-watch.md": {
	id: "solara-ver9.0-06-end-of-watch.md";
  slug: "solara-ver90-06-end-of-watch";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.0-07-the-age-of-dreams.md": {
	id: "solara-ver9.0-07-the-age-of-dreams.md";
  slug: "solara-ver90-07-the-age-of-dreams";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.0-08-across-space-and-time.md": {
	id: "solara-ver9.0-08-across-space-and-time.md";
  slug: "solara-ver90-08-across-space-and-time";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.0-09-disorder-and-chaos.md": {
	id: "solara-ver9.0-09-disorder-and-chaos.md";
  slug: "solara-ver90-09-disorder-and-chaos";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.0-10-castor.md": {
	id: "solara-ver9.0-10-castor.md";
  slug: "solara-ver90-10-castor";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.0-11-speed-of-dawn.md": {
	id: "solara-ver9.0-11-speed-of-dawn.md";
  slug: "solara-ver90-11-speed-of-dawn";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.0-12-the-north-of-everything.md": {
	id: "solara-ver9.0-12-the-north-of-everything.md";
  slug: "solara-ver90-12-the-north-of-everything";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.1-01-nova.md": {
	id: "solara-ver9.1-01-nova.md";
  slug: "solara-ver91-01-nova";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.1-02-stargazer.md": {
	id: "solara-ver9.1-02-stargazer.md";
  slug: "solara-ver91-02-stargazer";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.1-03-into-the-void.md": {
	id: "solara-ver9.1-03-into-the-void.md";
  slug: "solara-ver91-03-into-the-void";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.1-04-the-fall.md": {
	id: "solara-ver9.1-04-the-fall.md";
  slug: "solara-ver91-04-the-fall";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.1-05-appulse.md": {
	id: "solara-ver9.1-05-appulse.md";
  slug: "solara-ver91-05-appulse";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.1-06-hollow-encounter.md": {
	id: "solara-ver9.1-06-hollow-encounter.md";
  slug: "solara-ver91-06-hollow-encounter";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.1-07-existential-crisis.md": {
	id: "solara-ver9.1-07-existential-crisis.md";
  slug: "solara-ver91-07-existential-crisis";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.1-08-gates-of-the-fold.md": {
	id: "solara-ver9.1-08-gates-of-the-fold.md";
  slug: "solara-ver91-08-gates-of-the-fold";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.1-09-chaos.md": {
	id: "solara-ver9.1-09-chaos.md";
  slug: "solara-ver91-09-chaos";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.1-10-disorder.md": {
	id: "solara-ver9.1-10-disorder.md";
  slug: "solara-ver91-10-disorder";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.1-11-every-one-s.md": {
	id: "solara-ver9.1-11-every-one-s.md";
  slug: "solara-ver91-11-every-one-s";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.1-12-the-old-guard.md": {
	id: "solara-ver9.1-12-the-old-guard.md";
  slug: "solara-ver91-12-the-old-guard";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.2-01-nebula.md": {
	id: "solara-ver9.2-01-nebula.md";
  slug: "solara-ver92-01-nebula";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.2-02-cosmic-debris.md": {
	id: "solara-ver9.2-02-cosmic-debris.md";
  slug: "solara-ver92-02-cosmic-debris";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.2-03-sunburn.md": {
	id: "solara-ver9.2-03-sunburn.md";
  slug: "solara-ver92-03-sunburn";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.2-04-bountiful-bounty.md": {
	id: "solara-ver9.2-04-bountiful-bounty.md";
  slug: "solara-ver92-04-bountiful-bounty";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.2-05-crew-of-menace.md": {
	id: "solara-ver9.2-05-crew-of-menace.md";
  slug: "solara-ver92-05-crew-of-menace";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.2-06-eclipse-of-order.md": {
	id: "solara-ver9.2-06-eclipse-of-order.md";
  slug: "solara-ver92-06-eclipse-of-order";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.2-07-stellar-parallax.md": {
	id: "solara-ver9.2-07-stellar-parallax.md";
  slug: "solara-ver92-07-stellar-parallax";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.2-08-epoch-collision.md": {
	id: "solara-ver9.2-08-epoch-collision.md";
  slug: "solara-ver92-08-epoch-collision";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.2-09-and.md": {
	id: "solara-ver9.2-09-and.md";
  slug: "solara-ver92-09-and";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.2-10-gravity.md": {
	id: "solara-ver9.2-10-gravity.md";
  slug: "solara-ver92-10-gravity";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.2-11-forbidden-star.md": {
	id: "solara-ver9.2-11-forbidden-star.md";
  slug: "solara-ver92-11-forbidden-star";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.2-12-true-polaris.md": {
	id: "solara-ver9.2-12-true-polaris.md";
  slug: "solara-ver92-12-true-polaris";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.3-01-corona.md": {
	id: "solara-ver9.3-01-corona.md";
  slug: "solara-ver93-01-corona";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.3-02-warped-reality.md": {
	id: "solara-ver9.3-02-warped-reality.md";
  slug: "solara-ver93-02-warped-reality";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.3-03-the-queen-and-the-destructions.md": {
	id: "solara-ver9.3-03-the-queen-and-the-destructions.md";
  slug: "solara-ver93-03-the-queen-and-the-destructions";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.3-04-castor-s-flare.md": {
	id: "solara-ver9.3-04-castor-s-flare.md";
  slug: "solara-ver93-04-castor-s-flare";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.3-05-the-labors.md": {
	id: "solara-ver9.3-05-the-labors.md";
  slug: "solara-ver93-05-the-labors";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.3-06-convergence.md": {
	id: "solara-ver9.3-06-convergence.md";
  slug: "solara-ver93-06-convergence";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.3-07-beautiful-disaster.md": {
	id: "solara-ver9.3-07-beautiful-disaster.md";
  slug: "solara-ver93-07-beautiful-disaster";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.3-08-the-hero-and-the-hunter.md": {
	id: "solara-ver9.3-08-the-hero-and-the-hunter.md";
  slug: "solara-ver93-08-the-hero-and-the-hunter";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.3-09-gemini.md": {
	id: "solara-ver9.3-09-gemini.md";
  slug: "solara-ver93-09-gemini";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.3-10-herc-and-cassie.md": {
	id: "solara-ver9.3-10-herc-and-cassie.md";
  slug: "solara-ver93-10-herc-and-cassie";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.3-11-level-29.md": {
	id: "solara-ver9.3-11-level-29.md";
  slug: "solara-ver93-11-level-29";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.3-12-hollow-the.md": {
	id: "solara-ver9.3-12-hollow-the.md";
  slug: "solara-ver93-12-hollow-the";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.4-01-quasar.md": {
	id: "solara-ver9.4-01-quasar.md";
  slug: "solara-ver94-01-quasar";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.4-02-the-folds.md": {
	id: "solara-ver9.4-02-the-folds.md";
  slug: "solara-ver94-02-the-folds";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.4-03-looming-separation.md": {
	id: "solara-ver9.4-03-looming-separation.md";
  slug: "solara-ver94-03-looming-separation";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.4-04-cloudy-with-a-chance-of-flare.md": {
	id: "solara-ver9.4-04-cloudy-with-a-chance-of-flare.md";
  slug: "solara-ver94-04-cloudy-with-a-chance-of-flare";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.4-05-juxtaposition.md": {
	id: "solara-ver9.4-05-juxtaposition.md";
  slug: "solara-ver94-05-juxtaposition";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.4-06-space-raven.md": {
	id: "solara-ver9.4-06-space-raven.md";
  slug: "solara-ver94-06-space-raven";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.4-07-journey-home.md": {
	id: "solara-ver9.4-07-journey-home.md";
  slug: "solara-ver94-07-journey-home";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.4-08-pollux.md": {
	id: "solara-ver9.4-08-pollux.md";
  slug: "solara-ver94-08-pollux";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.4-09-sigma-octantis.md": {
	id: "solara-ver9.4-09-sigma-octantis.md";
  slug: "solara-ver94-09-sigma-octantis";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.4-10-when-stars-align.md": {
	id: "solara-ver9.4-10-when-stars-align.md";
  slug: "solara-ver94-10-when-stars-align";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.4-11-paradigm-shift.md": {
	id: "solara-ver9.4-11-paradigm-shift.md";
  slug: "solara-ver94-11-paradigm-shift";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.4-12-crew-s-control.md": {
	id: "solara-ver9.4-12-crew-s-control.md";
  slug: "solara-ver94-12-crew-s-control";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.5-01-pulsar.md": {
	id: "solara-ver9.5-01-pulsar.md";
  slug: "solara-ver95-01-pulsar";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.5-02-liquid-reality.md": {
	id: "solara-ver9.5-02-liquid-reality.md";
  slug: "solara-ver95-02-liquid-reality";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.5-03-chaotic-reunion.md": {
	id: "solara-ver9.5-03-chaotic-reunion.md";
  slug: "solara-ver95-03-chaotic-reunion";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.5-04-council-matters.md": {
	id: "solara-ver9.5-04-council-matters.md";
  slug: "solara-ver95-04-council-matters";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.5-05-string-theory.md": {
	id: "solara-ver9.5-05-string-theory.md";
  slug: "solara-ver95-05-string-theory";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.5-06-the-dragon-and-the-serpent.md": {
	id: "solara-ver9.5-06-the-dragon-and-the-serpent.md";
  slug: "solara-ver95-06-the-dragon-and-the-serpent";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.5-07-beneath-the-fold.md": {
	id: "solara-ver9.5-07-beneath-the-fold.md";
  slug: "solara-ver95-07-beneath-the-fold";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.5-08-103.md": {
	id: "solara-ver9.5-08-103.md";
  slug: "solara-ver95-08-103";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.5-09-one-and-some.md": {
	id: "solara-ver9.5-09-one-and-some.md";
  slug: "solara-ver95-09-one-and-some";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.5-10-draco-and-hydra.md": {
	id: "solara-ver9.5-10-draco-and-hydra.md";
  slug: "solara-ver95-10-draco-and-hydra";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.5-11-council-matters-again.md": {
	id: "solara-ver9.5-11-council-matters-again.md";
  slug: "solara-ver95-11-council-matters-again";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.5-12-captain-s-orders.md": {
	id: "solara-ver9.5-12-captain-s-orders.md";
  slug: "solara-ver95-12-captain-s-orders";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.6-01-intergalactic-supernova.md": {
	id: "solara-ver9.6-01-intergalactic-supernova.md";
  slug: "solara-ver96-01-intergalactic-supernova";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.6-02-crew-s-blues.md": {
	id: "solara-ver9.6-02-crew-s-blues.md";
  slug: "solara-ver96-02-crew-s-blues";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.6-03-extra-helping.md": {
	id: "solara-ver9.6-03-extra-helping.md";
  slug: "solara-ver96-03-extra-helping";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.6-04-destruction-overload.md": {
	id: "solara-ver9.6-04-destruction-overload.md";
  slug: "solara-ver96-04-destruction-overload";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.6-05-hypothetical-rhetoric.md": {
	id: "solara-ver9.6-05-hypothetical-rhetoric.md";
  slug: "solara-ver96-05-hypothetical-rhetoric";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.6-06-captain-chaos.md": {
	id: "solara-ver9.6-06-captain-chaos.md";
  slug: "solara-ver96-06-captain-chaos";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.6-07-light-speed.md": {
	id: "solara-ver9.6-07-light-speed.md";
  slug: "solara-ver96-07-light-speed";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.6-08-sound-of-silence.md": {
	id: "solara-ver9.6-08-sound-of-silence.md";
  slug: "solara-ver96-08-sound-of-silence";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.6-09-wrong-turn.md": {
	id: "solara-ver9.6-09-wrong-turn.md";
  slug: "solara-ver96-09-wrong-turn";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.6-10-precision-decision.md": {
	id: "solara-ver9.6-10-precision-decision.md";
  slug: "solara-ver96-10-precision-decision";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.6-11-level-289.md": {
	id: "solara-ver9.6-11-level-289.md";
  slug: "solara-ver96-11-level-289";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.6-12-the-last-frontier.md": {
	id: "solara-ver9.6-12-the-last-frontier.md";
  slug: "solara-ver96-12-the-last-frontier";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.7-01-syzygy.md": {
	id: "solara-ver9.7-01-syzygy.md";
  slug: "solara-ver97-01-syzygy";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.7-02-boots-and-camps.md": {
	id: "solara-ver9.7-02-boots-and-camps.md";
  slug: "solara-ver97-02-boots-and-camps";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.7-03-any-one-s.md": {
	id: "solara-ver9.7-03-any-one-s.md";
  slug: "solara-ver97-03-any-one-s";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.7-04-strategic-planning.md": {
	id: "solara-ver9.7-04-strategic-planning.md";
  slug: "solara-ver97-04-strategic-planning";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.7-05-captain-commander.md": {
	id: "solara-ver9.7-05-captain-commander.md";
  slug: "solara-ver97-05-captain-commander";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.7-06-boots-and-camps-ii.md": {
	id: "solara-ver9.7-06-boots-and-camps-ii.md";
  slug: "solara-ver97-06-boots-and-camps-ii";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.7-07-the-messenger.md": {
	id: "solara-ver9.7-07-the-messenger.md";
  slug: "solara-ver97-07-the-messenger";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.7-08-279-280.md": {
	id: "solara-ver9.7-08-279-280.md";
  slug: "solara-ver97-08-279-280";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.7-09-the-hole.md": {
	id: "solara-ver9.7-09-the-hole.md";
  slug: "solara-ver97-09-the-hole";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.7-10-vega.md": {
	id: "solara-ver9.7-10-vega.md";
  slug: "solara-ver97-10-vega";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.7-11-darkness.md": {
	id: "solara-ver9.7-11-darkness.md";
  slug: "solara-ver97-11-darkness";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.7-12-polaris-and-sigma.md": {
	id: "solara-ver9.7-12-polaris-and-sigma.md";
  slug: "solara-ver97-12-polaris-and-sigma";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.8-01-solstice.md": {
	id: "solara-ver9.8-01-solstice.md";
  slug: "solara-ver98-01-solstice";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.8-02-chaotic-discovery.md": {
	id: "solara-ver9.8-02-chaotic-discovery.md";
  slug: "solara-ver98-02-chaotic-discovery";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.8-03-lowest-level.md": {
	id: "solara-ver9.8-03-lowest-level.md";
  slug: "solara-ver98-03-lowest-level";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.8-04-a-fragment-in-time.md": {
	id: "solara-ver9.8-04-a-fragment-in-time.md";
  slug: "solara-ver98-04-a-fragment-in-time";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.8-05-negative-polarity.md": {
	id: "solara-ver9.8-05-negative-polarity.md";
  slug: "solara-ver98-05-negative-polarity";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.8-06-two-hundred-ninety-nine-thousand-299-000.md": {
	id: "solara-ver9.8-06-two-hundred-ninety-nine-thousand-299-000.md";
  slug: "solara-ver98-06-two-hundred-ninety-nine-thousand-299-000";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.8-07-territorial-field.md": {
	id: "solara-ver9.8-07-territorial-field.md";
  slug: "solara-ver98-07-territorial-field";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.8-08-council-counsel.md": {
	id: "solara-ver9.8-08-council-counsel.md";
  slug: "solara-ver98-08-council-counsel";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.8-09-sitnatco-amgis.md": {
	id: "solara-ver9.8-09-sitnatco-amgis.md";
  slug: "solara-ver98-09-sitnatco-amgis";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.8-10-siralop.md": {
	id: "solara-ver9.8-10-siralop.md";
  slug: "solara-ver98-10-siralop";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.8-11-light-and-dark.md": {
	id: "solara-ver9.8-11-light-and-dark.md";
  slug: "solara-ver98-11-light-and-dark";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.8-12-sister-e.md": {
	id: "solara-ver9.8-12-sister-e.md";
  slug: "solara-ver98-12-sister-e";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.9-01-protostar.md": {
	id: "solara-ver9.9-01-protostar.md";
  slug: "solara-ver99-01-protostar";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.9-02-stellar-evolution.md": {
	id: "solara-ver9.9-02-stellar-evolution.md";
  slug: "solara-ver99-02-stellar-evolution";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.9-03-chaotic-destruction.md": {
	id: "solara-ver9.9-03-chaotic-destruction.md";
  slug: "solara-ver99-03-chaotic-destruction";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.9-04-the-absence-of-intel.md": {
	id: "solara-ver9.9-04-the-absence-of-intel.md";
  slug: "solara-ver99-04-the-absence-of-intel";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.9-05-speck-tackle-are.md": {
	id: "solara-ver9.9-05-speck-tackle-are.md";
  slug: "solara-ver99-05-speck-tackle-are";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.9-06-documented-his-story.md": {
	id: "solara-ver9.9-06-documented-his-story.md";
  slug: "solara-ver99-06-documented-his-story";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.9-07-power-overload.md": {
	id: "solara-ver9.9-07-power-overload.md";
  slug: "solara-ver99-07-power-overload";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.9-08-mission-control.md": {
	id: "solara-ver9.9-08-mission-control.md";
  slug: "solara-ver99-08-mission-control";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.9-09-first-contact.md": {
	id: "solara-ver9.9-09-first-contact.md";
  slug: "solara-ver99-09-first-contact";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.9-10-water-gate.md": {
	id: "solara-ver9.9-10-water-gate.md";
  slug: "solara-ver99-10-water-gate";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.9-11-book-of-ila.md": {
	id: "solara-ver9.9-11-book-of-ila.md";
  slug: "solara-ver99-11-book-of-ila";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"solara-ver9.9-12-amalgamation.md": {
	id: "solara-ver9.9-12-amalgamation.md";
  slug: "solara-ver99-12-amalgamation";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"tartarus-9.md": {
	id: "tartarus-9.md";
  slug: "tartarus-9";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"the-5th-rider.md": {
	id: "the-5th-rider.md";
  slug: "the-5th-rider";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"the-8th-day.md": {
	id: "the-8th-day.md";
  slug: "the-8th-day";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"the-brooding-silence.md": {
	id: "the-brooding-silence.md";
  slug: "the-brooding-silence";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"the-commandment-keeper.md": {
	id: "the-commandment-keeper.md";
  slug: "the-commandment-keeper";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"the-crimson-riders.md": {
	id: "the-crimson-riders.md";
  slug: "the-crimson-riders";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"the-dominions.md": {
	id: "the-dominions.md";
  slug: "the-dominions";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"the-final-command.md": {
	id: "the-final-command.md";
  slug: "the-final-command";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"the-last-bastion-ii.md": {
	id: "the-last-bastion-ii.md";
  slug: "the-last-bastion-ii";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"the-last-bastion.md": {
	id: "the-last-bastion.md";
  slug: "the-last-bastion";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"the-map-i-left-behind.md": {
	id: "the-map-i-left-behind.md";
  slug: "the-map-i-left-behind";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"the-ones-below.md": {
	id: "the-ones-below.md";
  slug: "the-ones-below";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"the-possession-of-pandora-raven.md": {
	id: "the-possession-of-pandora-raven.md";
  slug: "the-possession-of-pandora-raven";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"the-priest.md": {
	id: "the-priest.md";
  slug: "the-priest";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"the-ravens-light.md": {
	id: "the-ravens-light.md";
  slug: "the-ravens-light";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"the-ravens-shadow.md": {
	id: "the-ravens-shadow.md";
  slug: "the-ravens-shadow";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"the-repossession-of-pandora-raven.md": {
	id: "the-repossession-of-pandora-raven.md";
  slug: "the-repossession-of-pandora-raven";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"the-silence-doesnt-worship.md": {
	id: "the-silence-doesnt-worship.md";
  slug: "the-silence-doesnt-worship";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"the-two-towers.md": {
	id: "the-two-towers.md";
  slug: "the-two-towers";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"those-left-behind.md": {
	id: "those-left-behind.md";
  slug: "those-left-behind";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"throne-of-everything.md": {
	id: "throne-of-everything.md";
  slug: "throne-of-everything";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"through-my-purple-eyes.md": {
	id: "through-my-purple-eyes.md";
  slug: "through-my-purple-eyes";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"through-space-and-time.md": {
	id: "through-space-and-time.md";
  slug: "through-space-and-time";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"true-north.md": {
	id: "true-north.md";
  slug: "true-north";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"unbroken-mercy.md": {
	id: "unbroken-mercy.md";
  slug: "unbroken-mercy";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"unlikely-encounter.md": {
	id: "unlikely-encounter.md";
  slug: "unlikely-encounter";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"voices.md": {
	id: "voices.md";
  slug: "voices";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"white-noise.md": {
	id: "white-noise.md";
  slug: "white-noise";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
"wicked.md": {
	id: "wicked.md";
  slug: "wicked";
  body: string;
  collection: "songs";
  data: InferEntrySchema<"songs">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
