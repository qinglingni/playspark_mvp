// Activities to remove (duplicates/too similar)
export const activitiesToRemove = [
  "Advanced Science Experiments", // Keep "Beginning Science Journal" instead
  "Creative Writing Stories", // Keep "Story Writing Workshop" (more comprehensive)
  "Advanced Building Challenge", // Keep "Complex Building Projects" (better for 6-7)
  "Research Project Fun", // Too generic, covered by other activities
];

// Enhanced activities with detailInfo for ages 5-6 and 6-7
export const enhancedActivities = [
  {
    title: "Beginning Science Journal",
    ageRange: "5-6",
    detailedInfo: {
      detailedSteps: [
        {
          step: "Set up a special science notebook",
          description: "Help your child decorate a notebook that will be their special science journal. Add their name and 'Science Explorer' on the cover.",
          tips: ["Use stickers and drawings to make it exciting", "Keep it in a special place with their science tools"]
        },
        {
          step: "Choose something to observe daily",
          description: "Pick something that changes like a plant, the weather, or a pet. Draw or write about it each day.",
          tips: ["Start with 5-minute observations", "Use a timer to make it a fun challenge", "Take photos to compare changes"]
        },
        {
          step: "Record findings with drawings and words",
          description: "Draw what you see and write simple observations. Use measuring tools when possible.",
          tips: ["Date each entry", "Use colors to show differences", "Encourage 'I wonder' questions"]
        }
      ],
      learningBenefits: [
        "Develops observation skills and attention to detail",
        "Introduces scientific method and documentation",
        "Builds writing and drawing skills simultaneously",
        "Encourages curiosity and questioning"
      ],
      safetyTips: [
        "Supervise any outdoor observations",
        "Teach not to touch unknown plants or insects"
      ],
      variations: {
        easier: "Focus on drawing only, parent writes observations",
        harder: "Add measurements, predictions, and hypothesis testing"
      },
      parentTips: [
        "Model curiosity by asking 'What do you notice?' questions",
        "Celebrate small discoveries enthusiastically",
        "Review the journal together weekly to spot patterns"
      ]
    }
  },
  {
    title: "Story Writing Workshop",
    ageRange: "6-7",
    detailedInfo: {
      detailedSteps: [
        {
          step: "Create a story planning page",
          description: "Draw boxes for: Main character, Setting, Problem, Solution. Fill each box with drawings or words.",
          tips: ["Use story dice or cards for inspiration", "Let child choose favorite character type first"]
        },
        {
          step: "Write the story in three parts",
          description: "Beginning (introduce character and setting), Middle (the problem happens), End (how it's solved).",
          tips: ["Aim for 3-5 sentences per part initially", "Don't worry about spelling - focus on ideas"]
        },
        {
          step: "Add illustrations and share",
          description: "Draw pictures for each part of the story. Read it aloud to family with dramatic voices!",
          tips: ["Make it a 'book' by stapling pages together", "Record audio version on phone"]
        }
      ],
      learningBenefits: [
        "Develops narrative structure understanding",
        "Builds creative writing and sequencing skills",
        "Enhances vocabulary and sentence construction",
        "Boosts confidence in written expression"
      ],
      safetyTips: [],
      variations: {
        easier: "Child tells story orally, parent writes it down",
        harder: "Add dialogue, descriptive words, and multiple characters"
      },
      parentTips: [
        "Focus on creativity over correctness",
        "Ask 'What happens next?' to keep story flowing",
        "Display finished stories proudly"
      ]
    }
  },
  {
    title: "Complex Building Projects",
    ageRange: "6-7",
    detailedInfo: {
      detailedSteps: [
        {
          step: "Plan your structure on paper first",
          description: "Draw what you want to build. Label parts and list materials needed.",
          tips: ["Look at real buildings for inspiration", "Start with simple shapes and add details"]
        },
        {
          step: "Build the foundation and frame",
          description: "Create a strong base using largest/strongest pieces. Build up the main structure.",
          tips: ["Test stability frequently", "Use triangles for strength", "Build on flat, stable surface"]
        },
        {
          step: "Add details and test stability",
          description: "Add windows, doors, decorations. Test with gentle shaking. Modify if needed.",
          tips: ["Take photos before adding each layer", "Keep spare pieces for repairs"]
        }
      ],
      learningBenefits: [
        "Develops spatial reasoning and 3D thinking",
        "Teaches engineering principles and problem-solving",
        "Builds patience and persistence",
        "Enhances planning and execution skills"
      ],
      safetyTips: [
        "Clear building area of breakables",
        "Build at table height to avoid bending",
        "Keep small pieces away from younger siblings"
      ],
      variations: {
        easier: "Follow picture instructions for specific model",
        harder: "Build moving parts or multi-story structures"
      },
      parentTips: [
        "Let child problem-solve before offering help",
        "Celebrate the process, not just the result",
        "Keep creations displayed for a few days"
      ]
    }
  },
  {
    title: "Comic Strip Creator",
    ageRange: "5-6",
    detailedInfo: {
      detailedSteps: [
        {
          step: "Fold paper to make comic panels",
          description: "Fold paper in half twice to create 4 boxes, or draw lines to make 6 boxes.",
          tips: ["Number the boxes 1-4 or 1-6", "Make boxes big enough for drawings"]
        },
        {
          step: "Draw simple stick figures telling a story",
          description: "Start with characters in box 1, show action in middle boxes, end in last box.",
          tips: ["Stick figures are perfect!", "Add speech bubbles with simple words"]
        },
        {
          step: "Add speech bubbles and sound effects",
          description: "Draw bubbles from characters' mouths. Add POW!, ZOOM!, or WOW! for fun.",
          tips: ["Use different bubble shapes for talking vs thinking", "Make sound effects colorful and big"]
        }
      ],
      learningBenefits: [
        "Combines visual and verbal storytelling",
        "Develops sequential thinking",
        "Builds early writing skills",
        "Encourages creative expression"
      ],
      safetyTips: [],
      variations: {
        easier: "Parent draws panels, child fills in with stickers",
        harder: "Create ongoing series with same characters"
      },
      parentTips: [
        "Start by retelling familiar stories in comic form",
        "Act out the story first, then draw it",
        "Make copies so child can color multiple versions"
      ]
    }
  },
  {
    title: "Nature Art Collection",
    ageRange: "5-6",
    detailedInfo: {
      detailedSteps: [
        {
          step: "Collect natural materials on a walk",
          description: "Gather leaves, flowers, twigs, pebbles. Use a basket or bag for collecting.",
          tips: ["Only take fallen items", "Collect variety of colors and textures", "Take photos of items you can't take"]
        },
        {
          step: "Sort materials by type, color, or size",
          description: "Create groups: all leaves together, arrange by color gradient, or size order.",
          tips: ["Use egg cartons for sorting small items", "Make patterns with sorted items"]
        },
        {
          step: "Create art by gluing onto paper",
          description: "Arrange materials into pictures, patterns, or designs. Glue down carefully.",
          tips: ["Try making faces, animals, or landscapes", "Press flowers first for flat art", "Spray with hairspray to preserve"]
        }
      ],
      learningBenefits: [
        "Connects art with nature exploration",
        "Develops classification and sorting skills",
        "Enhances fine motor control",
        "Builds appreciation for natural beauty"
      ],
      safetyTips: [
        "Check for insects before bringing items inside",
        "Avoid plants with thorns or poison ivy",
        "Wash hands after handling natural materials"
      ],
      variations: {
        easier: "Make simple patterns or color wheels",
        harder: "Create detailed scenes or self-portraits with materials"
      },
      parentTips: [
        "Display art in frames or clear contact paper",
        "Create seasonal collections throughout the year",
        "Start a nature art journal"
      ]
    }
  },
  {
    title: "Math Word Problems",
    ageRange: "5-6",
    detailedInfo: {
      detailedSteps: [
        {
          step: "Create story problems about favorite things",
          description: "Use child's interests: 'You have 5 dinosaurs. 2 more come. How many now?'",
          tips: ["Use toys as props", "Keep numbers under 10 initially", "Draw pictures for each problem"]
        },
        {
          step: "Draw pictures to solve",
          description: "Draw the items in the problem. Cross out for subtraction, add more for addition.",
          tips: ["Use circles or squares if drawing is hard", "Color code: red for taking away, green for adding"]
        },
        {
          step: "Write the number sentence",
          description: "Turn the story into math: 5 + 2 = 7. Say it aloud as you write.",
          tips: ["Use sidewalk chalk for big writing", "Make number cards to move around"]
        }
      ],
      learningBenefits: [
        "Connects math to real-world situations",
        "Develops problem-solving strategies",
        "Builds number sense and operations understanding",
        "Enhances logical thinking"
      ],
      safetyTips: [],
      variations: {
        easier: "Use only numbers 1-5 and addition",
        harder: "Include two-step problems or introduce multiplication"
      },
      parentTips: [
        "Make problems about daily activities",
        "Let child create problems for you to solve",
        "Celebrate different solving methods"
      ]
    }
  },
  {
    title: "Photography Project",
    ageRange: "6-7",
    detailedInfo: {
      detailedSteps: [
        {
          step: "Choose a photo theme for the week",
          description: "Pick themes like: Colors, Shapes, Emotions, Nature, or Family.",
          tips: ["Start with 5 photos per theme", "Use phone or tablet camera", "Create a special photo folder"]
        },
        {
          step: "Take 5 photos each day",
          description: "Look for interesting angles, lighting, and compositions. Review photos together.",
          tips: ["Get close to subjects", "Try high and low angles", "Use natural light when possible"]
        },
        {
          step: "Create a photo story or album",
          description: "Arrange photos to tell a story. Add captions or voice recordings.",
          tips: ["Print favorites for physical album", "Make digital slideshow with music", "Share with grandparents"]
        }
      ],
      learningBenefits: [
        "Develops artistic eye and composition skills",
        "Enhances observation and attention to detail",
        "Builds technology skills appropriately",
        "Encourages creative expression"
      ],
      safetyTips: [
        "Set boundaries for where child can go to take photos",
        "Teach to ask permission before photographing people",
        "Supervise device use and storage"
      ],
      variations: {
        easier: "Take 3 photos daily, focus on one color or shape",
        harder: "Edit photos with filters, create photo essays with paragraphs"
      },
      parentTips: [
        "Model how to see interesting shots",
        "Review photos together daily",
        "Display best photos prominently"
      ]
    }
  },
  {
    title: "Kitchen Music Lab",
    ageRange: "6-7",
    detailedInfo: {
      detailedSteps: [
        {
          step: "Fill glasses with different water levels",
          description: "Line up 5-8 glasses. Fill with decreasing water amounts to create a scale.",
          tips: ["Use identical glasses for best sound", "Add food coloring for visual interest", "Test and adjust water levels"]
        },
        {
          step: "Tap glasses to play simple songs",
          description: "Number glasses 1-8. Try 'Mary Had a Little Lamb': 3-2-1-2-3-3-3.",
          tips: ["Use wooden spoon or pencil", "Start slowly", "Write number patterns for songs"]
        },
        {
          step: "Record your musical creation",
          description: "Add rhythm with pots and spoons. Record your concert!",
          tips: ["Layer different sounds", "Make up your own songs", "Perform for family"]
        }
      ],
      learningBenefits: [
        "Teaches pitch, rhythm, and cause-effect relationships",
        "Develops pattern recognition and sequencing",
        "Introduces basic physics of sound",
        "Builds musical confidence"
      ],
      safetyTips: [
        "Use plastic glasses for younger children",
        "Wipe up spills immediately",
        "Supervise glass handling"
      ],
      variations: {
        easier: "Use just 3-4 glasses for high/low sounds",
        harder: "Create two octaves, play harmony parts"
      },
      parentTips: [
        "Start with familiar nursery rhymes",
        "Let child experiment freely first",
        "Join in with another 'instrument'"
      ]
    }
  },
  {
    title: "Simple Board Game Design",
    ageRange: "5-6",
    detailedInfo: {
      detailedSteps: [
        {
          step: "Draw a path game on poster board",
          description: "Create a winding path with 20-30 spaces from START to FINISH. Decorate with theme.",
          tips: ["Use ruler for neat spaces", "Make path wide enough for game pieces", "Add shortcuts and longer routes"]
        },
        {
          step: "Add special spaces and rules",
          description: "Color some spaces: Red = go back 2, Green = go forward 3, Blue = do a silly action.",
          tips: ["Keep rules simple", "Write rules on index cards", "Test as you create"]
        },
        {
          step: "Make game pieces and play",
          description: "Use buttons, coins, or clay figures as pieces. Roll dice and follow the path!",
          tips: ["Make a spinner if no dice available", "Create player cards with special powers", "Time games to keep them moving"]
        }
      ],
      learningBenefits: [
        "Develops rule creation and logical thinking",
        "Enhances counting and number recognition",
        "Builds understanding of cause and effect",
        "Encourages creative problem-solving"
      ],
      safetyTips: [
        "Use child-safe scissors and materials",
        "Keep small pieces away from younger children"
      ],
      variations: {
        easier: "Make straight path with 15 spaces",
        harder: "Add math problems or reading challenges on spaces"
      },
      parentTips: [
        "Play the game multiple times to refine rules",
        "Let child be game master sometimes",
        "Invite friends to play the creation"
      ]
    }
  },
  {
    title: "Nature Documentation",
    ageRange: "6-7",
    detailedInfo: {
      detailedSteps: [
        {
          step: "Choose one nature spot to study weekly",
          description: "Pick a tree, garden bed, or yard corner. Visit same spot each week.",
          tips: ["Mark your spot with a flag or stone", "Visit at same time of day", "Bring observation tools"]
        },
        {
          step: "Document changes with drawings and notes",
          description: "Draw what you see. Write date, weather, and 3 observations.",
          tips: ["Use clipboard for outdoor drawing", "Create symbols for common observations", "Measure growth with ruler"]
        },
        {
          step: "Create a nature presentation",
          description: "After 4 weeks, make a poster or slideshow showing changes over time.",
          tips: ["Include before/after comparisons", "Add interesting facts you researched", "Present to family"]
        }
      ],
      learningBenefits: [
        "Develops scientific observation and documentation skills",
        "Teaches about seasonal changes and life cycles",
        "Builds patience and long-term thinking",
        "Enhances presentation skills"
      ],
      safetyTips: [
        "Check for hazards in observation area",
        "Wear appropriate outdoor clothing",
        "Don't disturb wildlife habitats"
      ],
      variations: {
        easier: "Observe for 2 weeks, focus on drawing only",
        harder: "Track multiple variables like temperature, rainfall, animal visitors"
      },
      parentTips: [
        "Model careful observation techniques",
        "Ask prediction questions",
        "Research findings together online"
      ]
    }
  },
  {
    title: "Coding Without Computers",
    ageRange: "6-7",
    detailedInfo: {
      detailedSteps: [
        {
          step: "Create arrow cards for directions",
          description: "Make cards with arrows: Forward, Back, Left, Right, Jump, Clap.",
          tips: ["Use different colors for different actions", "Add numbers for repeat", "Laminate for durability"]
        },
        {
          step: "Design obstacle courses and write 'code'",
          description: "Set up course with pillows, toys. Write sequence of cards to navigate.",
          tips: ["Start with 5-step sequences", "Test your code by following exactly", "Debug when it doesn't work"]
        },
        {
          step: "Take turns being robot and programmer",
          description: "Programmer arranges cards, 'Robot' follows instructions exactly.",
          tips: ["Robot must wait for each instruction", "Add sound effects for actions", "Celebrate successful programs"]
        }
      ],
      learningBenefits: [
        "Introduces programming logic and sequencing",
        "Develops problem decomposition skills",
        "Builds directional awareness and following instructions",
        "Teaches debugging and iteration"
      ],
      safetyTips: [
        "Clear space of tripping hazards",
        "Set boundaries for course area"
      ],
      variations: {
        easier: "Use only 4 directions, shorter sequences",
        harder: "Add conditionals: 'If you see red, turn left'"
      },
      parentTips: [
        "Make mistakes on purpose to practice debugging",
        "Gradually increase complexity",
        "Connect to how real robots/computers work"
      ]
    }
  },
  {
    title: "Math Games Tournament",
    ageRange: "6-7",
    detailedInfo: {
      detailedSteps: [
        {
          step: "Set up different math game stations",
          description: "Create 3 stations: Dice addition, Card subtraction, Domino patterns.",
          tips: ["Use timers for each station", "Keep score sheets at each", "Rotate every 10 minutes"]
        },
        {
          step: "Compete in timed challenges",
          description: "Try to beat your own best score at each station. Record scores on chart.",
          tips: ["Start with 2-minute rounds", "Use manipulatives if needed", "Cheer for effort not just correctness"]
        },
        {
          step: "Award medals for different achievements",
          description: "Give awards for: Most Improved, Best Effort, Problem Solver, Speed Master.",
          tips: ["Make medals from paper plates", "Everyone gets an award", "Display score charts"]
        }
      ],
      learningBenefits: [
        "Makes math practice engaging and fun",
        "Builds mental math speed and accuracy",
        "Develops healthy competition mindset",
        "Reinforces various math operations"
      ],
      safetyTips: [],
      variations: {
        easier: "Focus on addition only, use numbers 1-10",
        harder: "Include multiplication, fractions, or word problems"
      },
      parentTips: [
        "Focus on personal improvement over competition",
        "Join in as a player sometimes",
        "Adjust difficulty to maintain challenge without frustration"
      ]
    }
  }
];

// Activities that need only title updates (not removal)
export const titleUpdates = [
  {
    oldTitle: "Advanced Art Techniques",
    newTitle: "Art Explorer Workshop",
    ageRange: "6-7"
  },
  {
    oldTitle: "Strategy Board Games",
    newTitle: "Chess and Checkers Club",
    ageRange: "5-6"
  },
  {
    oldTitle: "Geography Adventure",
    newTitle: "World Explorer Maps",
    ageRange: "6-7"
  }
];

// Calm/Mindfulness activities enhancement
export const calmActivities = [
  {
    title: "Mindful Drawing Session",
    ageRange: "5-6",
    detailedInfo: {
      detailedSteps: [
        {
          step: "Set up a calm drawing space",
          description: "Dim lights slightly, play soft music, lay out paper and colors.",
          tips: ["Use calming background sounds", "Have child take 3 deep breaths before starting"]
        },
        {
          step: "Draw feelings using colors and shapes",
          description: "Ask 'What color is happy? What shape is tired?' Draw without planning.",
          tips: ["No wrong answers", "Focus on the process not product", "Talk about feelings while drawing"]
        },
        {
          step: "Share your art and feelings",
          description: "Talk about what you drew and how you feel now. Display the art.",
          tips: ["Validate all feelings", "Note if mood changed while drawing"]
        }
      ],
      learningBenefits: [
        "Develops emotional awareness and expression",
        "Promotes relaxation and stress relief",
        "Builds focus and concentration",
        "Enhances creativity without pressure"
      ],
      safetyTips: [],
      variations: {
        easier: "Just scribble to music, no specific shapes",
        harder: "Create a feelings journal with daily entries"
      },
      parentTips: [
        "Model by doing your own mindful drawing",
        "Use when child seems overwhelmed",
        "Keep supplies readily accessible"
      ]
    }
  },
  {
    title: "Gentle Yoga and Stretching",
    ageRange: "5-6",
    detailedInfo: {
      detailedSteps: [
        {
          step: "Start with animal poses",
          description: "Try cat, cow, butterfly, and tree poses. Hold each for 3-5 breaths.",
          tips: ["Use yoga cards or videos for kids", "Make animal sounds with poses", "Use soft mat or carpet"]
        },
        {
          step: "Flow between poses slowly",
          description: "Connect poses with breathing. Inhale to stretch up, exhale to fold down.",
          tips: ["Count breaths aloud", "Move like the animal in slow motion", "Play calming nature sounds"]
        },
        {
          step: "End with quiet relaxation",
          description: "Lie on back, close eyes, imagine floating on a cloud for 2 minutes.",
          tips: ["Guide with soft voice", "Use visualization story", "End with gentle bell sound"]
        }
      ],
      learningBenefits: [
        "Develops body awareness and flexibility",
        "Teaches breath control and relaxation",
        "Improves balance and coordination",
        "Reduces anxiety and promotes calm"
      ],
      safetyTips: [
        "Never force stretches",
        "Keep sessions short (10-15 minutes)",
        "Avoid inversions if child just ate"
      ],
      variations: {
        easier: "Do only 3 poses, focus on breathing",
        harder: "Create yoga story sequences, hold poses longer"
      },
      parentTips: [
        "Practice together for bonding",
        "Use before bedtime for better sleep",
        "Let child lead sometimes"
      ]
    }
  },
  {
    title: "Meditation and Breathing Games",
    ageRange: "6-7",
    detailedInfo: {
      detailedSteps: [
        {
          step: "Practice bubble breathing",
          description: "Breathe in slowly through nose, blow out through mouth like blowing bubbles.",
          tips: ["Use real bubbles to visualize", "Count to 4 in, 6 out", "Place hand on belly to feel breathing"]
        },
        {
          step: "Try the listening game",
          description: "Sit quietly for 1 minute. Count how many different sounds you hear.",
          tips: ["Ring a bell to start and end", "Share what you heard", "Try with eyes closed"]
        },
        {
          step: "Do a body scan adventure",
          description: "Imagine a butterfly landing on each body part, relaxing it as it goes.",
          tips: ["Start at toes, work up to head", "Use soft, slow voice", "Take 5-7 minutes total"]
        }
      ],
      learningBenefits: [
        "Develops emotional regulation skills",
        "Improves focus and attention span",
        "Reduces stress and anxiety",
        "Builds mind-body connection"
      ],
      safetyTips: [],
      variations: {
        easier: "Just practice breathing for 1 minute",
        harder: "Try 5-minute guided meditations, introduce gratitude practice"
      },
      parentTips: [
        "Practice daily at same time",
        "Keep sessions short and fun",
        "Use when child is frustrated or overwhelmed"
      ]
    }
  }
];