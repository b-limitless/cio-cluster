const febricModel = {
  title: "Hello World",
  price: 123,
  delivery_time: 1,
  image_link: "Url of the image",
  excellence: "in 5 rating star",
  warmth: "",
  weight: 100,
  yarn: "",
  composition: [{}],
  season: "Year round",
  thread_style: "Twill",
  brightness: "",
  super_shiny: 0,
  material: "Cotton",
  tone: " - Navy Blue",
  thread_count: "",
  opacity: "",
  waterproof: true,
  stretchy_text: "Stretchy",
  stretchy: "",
  mis: ["new", "eco", "easy iron", "none iron"],
  type: ["shirt", "pants", "suits"],
};


export type febricType = typeof febricModel;

export type commonFebricStepType = {
  onChangeHandler: Function;
  febric: any;
  setErrors:Function;
  errors: any;

}