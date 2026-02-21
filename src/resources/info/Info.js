import self from "../img/self.png"

/* Hi there! Thanks for checking out my portfolio template. Be sure to read the comments to get a better understanding of
how to make this template work best for you! */

export let colors = ["rgb(0,255,164)", "rgb(166,104,255)"];
/*
I highly recommend using a gradient generator like https://gradientgenerator.paytonpierce.dev/ to generate a pair of colors that you like.
These colors will be used to style your name on the homepage, the background of your picture, and some other accents throughout
the site.
 */


/*
So let's get started! Some of the info below is pretty self-explanatory, like 'firstName' and 'bio'. I'll try to explain anything
that might not be obvious right off the bat :) I recommend looking at the template example live using "npm start" to get an idea
of what each of the values mean.
 */

export const info = {
    firstName: "Florian",
    lastName: "Valade",
    initials: "FV", // the example uses first and last, but feel free to use three or more if you like.
    position: "an AI Research Engineer",
    selfPortrait: self, // don't change this unless you want to name your self-portrait in the "img" folder something else!
    gradient: `-webkit-linear-gradient(135deg, ${colors})`, // don't change this either
    baseColor: colors[0],
    miniBio: [
        {
            emoji: '🌎',
            text: 'based in Paris, France'
        },
        {
            emoji: "💼",
            text: "AI Research Engineer at Fujitsu"
        },
        {
            emoji: "🎓",
            text: "PhD in AI · Université Gustave Eiffel (2026)"
        },
        {
            emoji: "📧",
            text: "florian_val@outlook.fr"
        }
    ],
    socials: [
        {
            link: "https://github.com/FlorianVal",
            icon: "fa fa-github",
            label: 'github'
        },
        {
            link: "https://www.linkedin.com/in/florian-valade/",
            icon: "fa fa-linkedin",
            label: 'linkedin'
        },
        {
            link: "https://twitter.com/FloValade",
            icon: "fa fa-twitter",
            label: 'twitter'
        },
        {
            link: "https://huggingface.co/valcore",
            path: "hf-logo.svg",
            label: 'huggingface'
        },
        {
            link: "https://scholar.google.com/citations?user=-8nBNzIAAAAJ",
            icon: "fa fa-graduation-cap",
            label: 'google scholar'
        }
    ],
    bio: "Hello! I'm Florian. I'm an AI Research Engineer at Fujitsu in Paris, where I develop and adapt large language models for various applications. I recently completed my PhD in AI at Université Gustave Eiffel, focusing on efficient deep learning — adaptive inference, early exits, and compute-efficient Transformers. I've trained GPT-style models up to 1.3B parameters on multi-GPU clusters and published at UAI 2025. I'm passionate about making deep learning faster, cheaper, and more practical.",
    skills:
    {
        proficientWith: ['python', 'pytorch', 'transformers', 'huggingface', 'distributed training (FSDP/DDP)', 'LLMs', 'git', 'docker'],
        exposedTo: ['jax', 'mlx', 'tensorflow', 'kubernetes', 'javascript', 'react']
    }
    ,
    hobbies: [],
    portfolio: [
        {
            title: "EERO: Early Exit with Reject Option (UAI 2025)",
            url: "https://github.com/FlorianVal",
            type: "custom-link",
            platformName: "Research Paper",
            emoji: "📄"
        },
        {
            title: "Branchy Phi-2 — Early Exit LLM Demo",
            url: "https://huggingface.co/spaces/valcore/Branchy-phi-2",
            type: "hf-link"
        },
        {
            title: "Recursive GPT — Scaling Laws of Recursive Transformers",
            url: "https://github.com/FlorianVal",
            type: "custom-link",
            platformName: "Research Project",
            emoji: "🔁"
        },
        {
            title: "VisioFlow — Computer Vision Flow Builder",
            url: "https://visioflow.fvalade.fr",
            type: "custom-link",
            platformName: "VisioFlow",
            emoji: "🖼️"
        },
        {
            title: "NLP & CV Course Materials",
            url: "https://github.com/FlorianVal/nlp-cv-materials",
            type: "custom-link",
            platformName: "GitHub",
            emoji: "📚"
        }
    ]
}