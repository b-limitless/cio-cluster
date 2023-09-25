// React here about the febric composition 
// There is table where you can find out the febrics
//chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://images-na.ssl-images-amazon.com/images/G/02/rainier/help/defects/Material_composition_EU_UK.pdf
// Season
/// Year round, winter, summer 

// Thread type check below 
// https://www.thehopegroup.com/blog/2020/05/learn-all-about-different-types-of-threads/

// Brightness
// https://www.xrite.com/service-support/whiteness_index

// About the tone 
// deep purples, lavender, pink, ice blue and bright blues, bright white, gray and navy.
// https://www.google.com/search?q=color+tone+type+for+clothing&sxsrf=ALiCzsbnpZGoOxVrmsA1Uo6ZfUB6jf_dUQ%3A1670320577836&ei=wRGPY5rVMtGEaZaDv8gK&ved=0ahUKEwjauc-F3eT7AhVRQhoKHZbBD6kQ4dUDCBA&uact=5&oq=color+tone+type+for+clothing&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCCEQoAEyBQghEKABMggIIRAWEB4QHToECCMQJzoFCAAQkQI6DQguEMcBENEDENQCEEM6CwguEIAEEMcBENEDOgsIABCABBCxAxCDAToRCC4QgAQQsQMQgwEQxwEQ0QM6BQgAEIAEOgcILhDUAhBDOgQIABBDOgoILhDHARDRAxBDOgcIABCxAxBDOggIABCABBCxAzoKCC4QgAQQ1AIQCjoHCAAQgAQQCjoKCAAQgAQQhwIQFDoFCAAQhgM6BggAEBYQHjoKCCEQFhAeEA8QHToHCCEQoAEQCkoECEEYAEoECEYYAFAAWJEpYP4qaAFwAXgAgAGhAogBoy-SAQcwLjEyLjE3mAEAoAEBwAEB&sclient=gws-wiz-serp

// Thread count 
// https://www.the-sustainable-fashion-collective.com/2014/10/29/thread-count-mean

// Opaciy 
//https://propercloth.com/reference/opacity-ratings/
const febricModel = {
    title: string, 
    category: 'pant' | 'shirt' | 'suit',
    price: integer,
    delivery_time: "days in time",
    image_link: "Url of the image",
    excellence: "in 5 rating star",
    warmth: "5 rating start",
    weight: "300 gr/m^2",
    yarn: "",
    composition: " - 78% Terylene & 18% Rayon & 4% Spandex",
    season: "Year round",
    thread_style: "Twill",
    brightness:"",
    super_shiny: 0,
    material: "Check the model material",
    tone: " - Navy Blue",
    thread_count: "",
    opacity: "",
    waterproof: true,
    stretchy_text: "Stretchy", 
    stretchy: "",
    mis: ["new", "eco", "easy iron", "none iron"],
    type: ["shirt", "pants", "suits"]
}