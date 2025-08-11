import { db } from "./db";
import { activities, type Activity } from "@shared/schema";

const seedActivities: Omit<Activity, 'id'>[] = [
  {
    title: "Paper Airplane Contest",
    materials: [
      { emoji: "📄", name: "Paper" },
      { emoji: "✏️", name: "Crayons" },
      { emoji: "📏", name: "Ruler" }
    ],
    steps: [
      "Fold different types of paper airplanes together",
      "Decorate each plane with unique designs",
      "Test which plane flies the farthest!"
    ],
    whyGreat: "Combines creativity with science! Kids learn about aerodynamics while expressing their artistic side.",
    ageRange: "4-8",
    duration: "30 min",
    tags: ["creative", "educational", "indoor", "little-mess", "basic"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "together",
    interests: ["arts", "science"]
  },
  {
    title: "Indoor Treasure Hunt",
    materials: [
      { emoji: "📝", name: "Paper" },
      { emoji: "🖍️", name: "Crayons" },
      { emoji: "🏠", name: "Household items" }
    ],
    steps: [
      "Draw simple picture clues leading to different rooms",
      "Hide clues around the house",
      "Follow the trail to find the treasure!"
    ],
    whyGreat: "Develops problem-solving skills and keeps kids active indoors. Great for rainy days!",
    ageRange: "3-7",
    duration: "30 min",
    tags: ["adventure", "problem-solving", "indoor", "no-mess", "basic"],
    energyLevel: "active",
    location: "indoor",
    whoPlaying: "together",
    interests: ["adventure"]
  },
  {
    title: "Dance Party Freeze",
    materials: [
      { emoji: "🎵", name: "Music player" },
      { emoji: "🕺", name: "Space to dance" }
    ],
    steps: [
      "Play upbeat music and dance together",
      "When music stops, freeze like statues!",
      "Try silly poses and take turns being the statue judge"
    ],
    whyGreat: "Burns energy, improves listening skills, and creates joyful bonding moments!",
    ageRange: "2-6",
    duration: "30 min",
    tags: ["movement", "music", "silly", "no-mess", "none"],
    energyLevel: "silly",
    location: "indoor",
    whoPlaying: "together",
    interests: ["music", "movement"]
  },
  {
    title: "Nature Scavenger Hunt",
    materials: [
      { emoji: "📋", name: "Checklist" },
      { emoji: "✏️", name: "Pencil" },
      { emoji: "🎒", name: "Collection bag" }
    ],
    steps: [
      "Create a list of outdoor items to find",
      "Explore the backyard or park together",
      "Check off items as you discover them"
    ],
    whyGreat: "Encourages observation skills and outdoor exploration while learning about nature.",
    ageRange: "3-8",
    duration: "60 min",
    tags: ["nature", "exploration", "educational", "no-mess", "basic"],
    energyLevel: "active",
    location: "outdoor",
    whoPlaying: "together",
    interests: ["science", "outdoor"]
  },
  {
    title: "Story Building Game",
    materials: [
      { emoji: "📚", name: "Picture books" },
      { emoji: "🎭", name: "Imagination" }
    ],
    steps: [
      "Start a story with one sentence",
      "Take turns adding one sentence each",
      "See where your silly story adventure goes!"
    ],
    whyGreat: "Builds language skills, creativity, and turn-taking while having fun together.",
    ageRange: "3-7",
    duration: "15 min",
    tags: ["language", "creative", "calm", "no-mess", "none"],
    energyLevel: "calm",
    location: "indoor",
    whoPlaying: "together",
    interests: ["reading", "creative"]
  },
  {
    title: "Kitchen Science Experiments",
    materials: [
      { emoji: "🧪", name: "Baking soda" },
      { emoji: "🍋", name: "Vinegar" },
      { emoji: "🎨", name: "Food coloring" }
    ],
    steps: [
      "Mix baking soda and vinegar to create fizzing reactions",
      "Add food coloring for colorful eruptions",
      "Discuss what's happening scientifically"
    ],
    whyGreat: "Introduces basic chemistry concepts in a safe, hands-on way that kids love!",
    ageRange: "4-8",
    duration: "30 min",
    tags: ["science", "messy", "educational", "messy", "basic"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "together",
    interests: ["science"]
  },
  {
    title: "Puzzle Time Challenge",
    materials: [
      { emoji: "🧩", name: "Age-appropriate puzzles" },
      { emoji: "⏰", name: "Timer" }
    ],
    steps: [
      "Choose a puzzle suitable for your child's age",
      "Work together to complete it",
      "Celebrate completion with a victory dance!"
    ],
    whyGreat: "Develops problem-solving skills, patience, and fine motor coordination.",
    ageRange: "2-8",
    duration: "30 min",
    tags: ["problem-solving", "quiet", "focused", "no-mess", "basic"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "together",
    interests: ["puzzles"]
  },
  {
    title: "Card Memory Game",
    materials: [
      { emoji: "🃏", name: "Deck of cards" },
      { emoji: "🧠", name: "Memory skills" }
    ],
    steps: [
      "Lay out 6-12 cards face down in a grid",
      "Take turns flipping two cards to find matches",
      "Keep matches when you find pairs!"
    ],
    whyGreat: "Improves memory, concentration, and turn-taking skills in a classic game format.",
    ageRange: "4-8",
    duration: "15 min",
    tags: ["games", "memory", "focused", "no-mess", "basic"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "together",
    interests: ["games"]
  },
  {
    title: "Simple Board Game Fun",
    materials: [
      { emoji: "🎲", name: "Board game" },
      { emoji: "⭐", name: "Game pieces" }
    ],
    steps: [
      "Choose an age-appropriate board game",
      "Take turns rolling dice and moving pieces",
      "Celebrate wins and good sportsmanship!"
    ],
    whyGreat: "Teaches rules, strategy, patience, and social skills in a structured, fun way.",
    ageRange: "3-8",
    duration: "30 min",
    tags: ["games", "strategy", "social", "no-mess", "basic"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "group",
    interests: ["games"]
  },
  {
    title: "Messy Paint Creation",
    materials: [
      { emoji: "🎨", name: "Washable paints" },
      { emoji: "📄", name: "Big paper" },
      { emoji: "🖌️", name: "Brushes" }
    ],
    steps: [
      "Set up a protected painting area",
      "Let creativity flow with finger painting or brushes",
      "Display the masterpiece when dry!"
    ],
    whyGreat: "Encourages self-expression, creativity, and sensory exploration through art.",
    ageRange: "2-6",
    duration: "45 min",
    tags: ["arts", "creative", "sensory", "messy", "special"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "together",
    interests: ["arts", "creative"]
  },
  {
    title: "Solo Reading Adventure",
    materials: [
      { emoji: "📖", name: "Picture books" },
      { emoji: "🛋️", name: "Cozy spot" }
    ],
    steps: [
      "Choose a few favorite books or discover new ones",
      "Find a comfortable reading spot",
      "Enjoy quiet story time at their own pace"
    ],
    whyGreat: "Builds independence, vocabulary, and imagination while enjoying peaceful quiet time.",
    ageRange: "3-8",
    duration: "30 min",
    tags: ["reading", "quiet", "independent", "no-mess", "none"],
    energyLevel: "calm",
    location: "indoor",
    whoPlaying: "alone",
    interests: ["reading"]
  },
  {
    title: "Outdoor Obstacle Course",
    materials: [
      { emoji: "🪣", name: "Cones or buckets" },
      { emoji: "🪢", name: "Jump rope" },
      { emoji: "⚽", name: "Ball" }
    ],
    steps: [
      "Set up stations: jumping, crawling, ball toss",
      "Demonstrate each station together",
      "Time runs and cheer each other on!"
    ],
    whyGreat: "Builds gross motor skills, confidence, and provides great physical exercise.",
    ageRange: "4-8",
    duration: "45 min",
    tags: ["physical", "active", "outdoor", "little-mess", "basic"],
    energyLevel: "active",
    location: "outdoor",
    whoPlaying: "together",
    interests: ["sports", "outdoor"]
  },
  {
    title: "Animal Freeze Dance",
    materials: [
      { emoji: "🎵", name: "Music player" },
      { emoji: "🕺", name: "Space to dance" }
    ],
    steps: [
      "Play fun music and dance like different animals",
      "When the music stops, freeze in your animal pose",
      "Take turns being the DJ and choosing animals to imitate"
    ],
    whyGreat: "Combines music, movement, and imagination while improving listening skills and body control.",
    ageRange: "3-7", // Keep for backwards compatibility
    minAge: 3,
    maxAge: 7,
    developmentStage: "early-preschool",
    skillRequirements: {
      motor: "developing",
      cognitive: "simple",
      social: "cooperative",
      attention: "15min"
    },
    duration: "15 min",
    tags: ["movement", "music", "silly", "no-mess", "basic"],
    energyLevel: "silly",
    location: "indoor",
    whoPlaying: "together",
    interests: ["music", "movement"]
  },
  {
    title: "Mirror Me Challenge",
    materials: [
      { emoji: "👥", name: "Just yourselves" }
    ],
    steps: [
      "Stand facing each other",
      "One person is the leader, making slow movements",
      "Others copy the movements exactly like a mirror"
    ],
    whyGreat: "Develops focus, body awareness, and social connection through synchronized movement.",
    ageRange: "4-8",
    duration: "15 min",
    tags: ["movement", "focus", "silly", "no-mess", "none"],
    energyLevel: "silly",
    location: "indoor",
    whoPlaying: "together",
    interests: ["movement", "creative"]
  },
  {
    title: "Silly Voice Story Time",
    materials: [
      { emoji: "📖", name: "Favorite story book" },
      { emoji: "🎭", name: "Imagination" }
    ],
    steps: [
      "Choose a familiar story everyone knows",
      "Each person picks a character and a silly voice",
      "Read the story together using your funny voices"
    ],
    whyGreat: "Makes reading interactive and hilarious while building confidence and creativity.",
    ageRange: "7-10",
    duration: "15 min",
    tags: ["reading", "creative", "silly", "no-mess", "basic"],
    energyLevel: "silly",
    location: "indoor",
    whoPlaying: "together",
    interests: ["reading", "creative"]
  },
  {
    title: "Indoor Obstacle Course",
    materials: [
      { emoji: "🛋️", name: "Pillows and cushions" },
      { emoji: "🪑", name: "Chairs" },
      { emoji: "📦", name: "Boxes or laundry baskets" }
    ],
    steps: [
      "Set up obstacles: pillows to jump over, chairs to crawl under",
      "Create a path through your living room",
      "Time each run and try to beat your record"
    ],
    whyGreat: "Turns your home into an adventure playground while building motor skills and burning energy.",
    ageRange: "3-8",
    duration: "15 min",
    tags: ["physical", "active", "silly", "no-mess", "basic"],
    energyLevel: "silly",
    location: "indoor",
    whoPlaying: "together",
    interests: ["sports", "movement"]
  },
  {
    title: "Yes/No Game",
    materials: [
      { emoji: "💭", name: "Quick thinking" }
    ],
    steps: [
      "One person asks questions trying to make others say 'yes' or 'no'",
      "Others must answer without using those words",
      "Switch roles when someone slips up"
    ],
    whyGreat: "Sharpens listening skills and quick thinking while creating lots of laughs.",
    ageRange: "6-10",
    duration: "15 min",
    tags: ["games", "language", "silly", "no-mess", "none"],
    energyLevel: "silly",
    location: "indoor",
    whoPlaying: "together",
    interests: ["games"]
  },
  {
    title: "Simon Says Silly Edition",
    materials: [
      { emoji: "🤸", name: "Space to move" }
    ],
    steps: [
      "Play classic Simon Says with silly commands",
      "Try 'Simon says wiggle your ears' or 'hop like a penguin'",
      "Take turns being Simon with creative commands"
    ],
    whyGreat: "Classic game that improves listening skills while encouraging creativity and silliness.",
    ageRange: "4-8",
    duration: "15 min",
    tags: ["games", "movement", "silly", "no-mess", "none"],
    energyLevel: "silly",
    location: "indoor",
    whoPlaying: "together",
    interests: ["games", "movement"]
  },
  {
    title: "Funny Face Contest",
    materials: [
      { emoji: "😊", name: "Your faces" },
      { emoji: "📱", name: "Camera (optional)" }
    ],
    steps: [
      "Take turns making the silliest faces possible",
      "Others try not to laugh while watching",
      "Optional: Take photos of the best faces"
    ],
    whyGreat: "Simple fun that builds confidence and creates joyful bonding moments.",
    ageRange: "3-8",
    duration: "15 min",
    tags: ["silly", "social", "no-mess", "none"],
    energyLevel: "silly",
    location: "indoor",
    whoPlaying: "together",
    interests: ["creative"]
  },
  {
    title: "Storytelling Chain",
    materials: [
      { emoji: "💭", name: "Imagination" }
    ],
    steps: [
      "First person starts a story with one sentence",
      "Each person adds one sentence to continue",
      "See where your collaborative story adventure goes"
    ],
    whyGreat: "Builds language skills, creativity, and cooperation while creating unique stories together.",
    ageRange: "5-10",
    duration: "15 min",
    tags: ["language", "creative", "calm", "no-mess", "none"],
    energyLevel: "calm",
    location: "indoor",
    whoPlaying: "together",
    interests: ["reading", "creative"]
  },
  {
    title: "Gentle Yoga Animals",
    materials: [
      { emoji: "🧘", name: "Yoga mat or carpet" }
    ],
    steps: [
      "Learn simple yoga poses named after animals",
      "Try cat, cow, cobra, and butterfly poses",
      "Hold each pose while making the animal sound"
    ],
    whyGreat: "Promotes flexibility, balance, and mindfulness in a playful, accessible way.",
    ageRange: "4-8",
    duration: "15 min",
    tags: ["movement", "calm", "mindfulness", "no-mess", "basic"],
    energyLevel: "calm",
    location: "indoor",
    whoPlaying: "together",
    interests: ["movement"]
  },
  {
    title: "Memory Drawing",
    materials: [
      { emoji: "✏️", name: "Paper and pencils" },
      { emoji: "🏠", name: "Household objects" }
    ],
    steps: [
      "Choose an object to study for 30 seconds",
      "Hide the object and draw it from memory",
      "Compare drawings with the real object"
    ],
    whyGreat: "Develops observation skills, memory, and artistic expression in a fun challenge.",
    ageRange: "6-10",
    duration: "30 min",
    tags: ["arts", "focus", "calm", "no-mess", "basic"],
    energyLevel: "calm",
    location: "indoor",
    whoPlaying: "together",
    interests: ["arts", "creative"]
  },
  {
    title: "Treasure Hunt",
    materials: [
      { emoji: "📝", name: "Paper for clues" },
      { emoji: "🖍️", name: "Crayons" },
      { emoji: "🎁", name: "Small prizes" }
    ],
    steps: [
      "Draw simple picture clues leading to different locations",
      "Hide clues around the room",
      "Follow the trail to find the treasure"
    ],
    whyGreat: "Encourages problem-solving and reading skills while creating an exciting adventure.",
    ageRange: "4-8",
    duration: "15 min",
    tags: ["adventure", "problem-solving", "silly", "no-mess", "basic"],
    energyLevel: "silly",
    location: "indoor",
    whoPlaying: "alone",
    interests: ["adventure"]
  },
  {
    title: "Sock Puppet Show",
    materials: [
      { emoji: "🧦", name: "Old socks" },
      { emoji: "👀", name: "Googly eyes or markers" },
      { emoji: "✂️", name: "Craft supplies" }
    ],
    steps: [
      "Decorate socks to create puppet characters",
      "Create a simple stage with a table or box",
      "Put on a puppet show with your characters"
    ],
    whyGreat: "Combines crafting with storytelling, building creativity and performance skills.",
    ageRange: "5-10",
    duration: "30 min",
    tags: ["crafts", "creative", "calm", "no-mess", "basic"],
    energyLevel: "calm",
    location: "indoor",
    whoPlaying: "alone",
    interests: ["arts", "creative"]
  },
  {
    title: "Indoor Bowling",
    materials: [
      { emoji: "🍾", name: "Plastic bottles" },
      { emoji: "⚽", name: "Soft ball" }
    ],
    steps: [
      "Set up plastic bottles as bowling pins",
      "Mark a throwing line with tape",
      "Roll the ball to knock down the pins"
    ],
    whyGreat: "Develops hand-eye coordination and spatial awareness in a safe indoor sport.",
    ageRange: "3-8",
    duration: "15 min",
    tags: ["games", "active", "silly", "no-mess", "basic"],
    energyLevel: "silly",
    location: "indoor",
    whoPlaying: "alone",
    interests: ["sports", "games"]
  },
  {
    title: "Kitchen Science Volcano",
    materials: [
      { emoji: "🧪", name: "Baking soda" },
      { emoji: "🍋", name: "Vinegar" },
      { emoji: "🎨", name: "Food coloring" }
    ],
    steps: [
      "Build a volcano shape with playdough or clay",
      "Mix baking soda in the crater",
      "Add colored vinegar for an eruption"
    ],
    whyGreat: "Introduces basic chemistry concepts through an exciting, visual experiment.",
    ageRange: "4-10",
    duration: "30 min",
    tags: ["science", "educational", "messy", "basic"],
    energyLevel: "silly",
    location: "indoor",
    whoPlaying: "together",
    interests: ["science"]
  },
  {
    title: "Finger Paint Masterpiece",
    materials: [
      { emoji: "🎨", name: "Washable finger paints" },
      { emoji: "📄", name: "Large paper" },
      { emoji: "👕", name: "Old clothes or apron" }
    ],
    steps: [
      "Set up a protected painting area",
      "Use fingers and hands to create art",
      "Try handprints, finger dots, and swirls"
    ],
    whyGreat: "Provides sensory exploration and creative expression without the pressure of perfection.",
    ageRange: "2-6",
    duration: "30 min",
    tags: ["arts", "sensory", "messy", "special"],
    energyLevel: "calm",
    location: "indoor",
    whoPlaying: "alone",
    interests: ["arts", "creative"]
  },
  {
    title: "Shaving Cream Sensory Play",
    materials: [
      { emoji: "🧴", name: "Shaving cream" },
      { emoji: "🍽️", name: "Tray or table" },
      { emoji: "🎨", name: "Food coloring (optional)" }
    ],
    steps: [
      "Spray shaving cream on a tray or wipeable surface",
      "Add drops of food coloring if desired",
      "Draw, write, and explore with hands"
    ],
    whyGreat: "Offers calming sensory input while practicing writing, drawing, and creative play.",
    ageRange: "3-7",
    duration: "15 min",
    tags: ["sensory", "messy", "calm", "basic"],
    energyLevel: "calm",
    location: "indoor",
    whoPlaying: "alone",
    interests: ["creative"]
  },
  {
    title: "Bubble Wrap Stomp",
    materials: [
      { emoji: "🫧", name: "Bubble wrap" },
      { emoji: "🎵", name: "Music (optional)" }
    ],
    steps: [
      "Lay out sheets of bubble wrap on the floor",
      "Take off shoes for best popping effect",
      "Jump, stomp, and dance on the bubble wrap"
    ],
    whyGreat: "Provides satisfying sensory feedback while burning energy and developing gross motor skills.",
    ageRange: "2-6",
    duration: "15 min",
    tags: ["sensory", "active", "silly", "no-mess", "basic"],
    energyLevel: "active",
    location: "indoor",
    whoPlaying: "alone",
    interests: ["movement"]
  },
  {
    title: "Rainbow Rice Sensory Bin",
    materials: [
      { emoji: "🍚", name: "Dry rice" },
      { emoji: "🎨", name: "Food coloring" },
      { emoji: "📦", name: "Large bin" },
      { emoji: "🥄", name: "Scoops and cups" }
    ],
    steps: [
      "Color rice with food coloring and let dry",
      "Fill bin with rainbow rice layers",
      "Hide small toys to find, pour, and explore"
    ],
    whyGreat: "Calming sensory play that develops fine motor skills and provides hours of exploration.",
    ageRange: "2-6",
    duration: "30 min",
    tags: ["sensory", "calm", "messy", "special"],
    energyLevel: "calm",
    location: "indoor",
    whoPlaying: "alone",
    interests: ["creative"]
  },
  {
    title: "Shadow Puppet Theater",
    materials: [
      { emoji: "🔦", name: "Flashlight or lamp" },
      { emoji: "🏠", name: "White wall or sheet" },
      { emoji: "✂️", name: "Cardboard for puppets" }
    ],
    steps: [
      "Set up light source facing a wall",
      "Create puppets from cardboard or use hands",
      "Tell stories with shadow movements"
    ],
    whyGreat: "Combines storytelling with visual creativity while exploring light and shadow science.",
    ageRange: "4-10",
    duration: "30 min",
    tags: ["creative", "storytelling", "calm", "no-mess", "basic"],
    energyLevel: "calm",
    location: "indoor",
    whoPlaying: "together",
    interests: ["creative", "science"]
  },
  {
    title: "Musical Instruments Parade",
    materials: [
      { emoji: "🥁", name: "Pots and wooden spoons" },
      { emoji: "🎶", name: "Rice in containers" },
      { emoji: "🎺", name: "Paper towel tubes" }
    ],
    steps: [
      "Create instruments from household items",
      "Practice different rhythms and sounds",
      "March around the house in a musical parade"
    ],
    whyGreat: "Explores rhythm, sound, and music while encouraging creativity and self-expression.",
    ageRange: "3-8",
    duration: "15 min",
    tags: ["music", "creative", "silly", "little-mess", "basic"],
    energyLevel: "active",
    location: "indoor",
    whoPlaying: "group",
    interests: ["music", "creative"]
  },
  {
    title: "Color Scavenger Hunt",
    materials: [
      { emoji: "🌈", name: "Color cards or samples" },
      { emoji: "🗑️", name: "Collection basket" }
    ],
    steps: [
      "Pick a color card from the deck",
      "Search the house for items matching that color",
      "Race to find the most items in 2 minutes"
    ],
    whyGreat: "Teaches color recognition while keeping kids active and engaged in observation skills.",
    ageRange: "2-6",
    duration: "15 min",
    tags: ["educational", "active", "game", "no-mess", "basic"],
    energyLevel: "active",
    location: "indoor",
    whoPlaying: "together",
    interests: ["games"]
  },
  {
    title: "Cardboard Box City",
    materials: [
      { emoji: "📦", name: "Various cardboard boxes" },
      { emoji: "🖍️", name: "Markers or crayons" },
      { emoji: "✂️", name: "Safety scissors" }
    ],
    steps: [
      "Collect different sized boxes",
      "Create buildings, roads, and bridges",
      "Add toy cars and figures to bring city to life"
    ],
    whyGreat: "Encourages spatial thinking, planning, and imaginative play while recycling materials.",
    ageRange: "4-10",
    duration: "60 min",
    tags: ["building", "creative", "imaginative", "little-mess", "basic"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "alone",
    interests: ["creative"]
  },
  {
    title: "Alphabet Body Shapes",
    materials: [
      { emoji: "🔤", name: "Alphabet cards (optional)" },
      { emoji: "🤸", name: "Floor space" }
    ],
    steps: [
      "Call out a letter of the alphabet",
      "Use your whole body to make that letter shape",
      "Take turns guessing each other's letters"
    ],
    whyGreat: "Combines physical activity with letter recognition and body awareness.",
    ageRange: "4-8",
    duration: "15 min",
    tags: ["educational", "movement", "silly", "no-mess", "none"],
    energyLevel: "active",
    location: "indoor",
    whoPlaying: "together",
    interests: ["movement", "reading"]
  },
  {
    title: "Ice Excavation Adventure",
    materials: [
      { emoji: "🧊", name: "Ice blocks with frozen toys" },
      { emoji: "🥄", name: "Spoons and tools" },
      { emoji: "💧", name: "Warm water" },
      { emoji: "🧂", name: "Salt" }
    ],
    steps: [
      "Freeze small toys in ice blocks overnight",
      "Use tools and warm water to excavate",
      "Experiment with salt to melt ice faster"
    ],
    whyGreat: "Teaches patience, problem-solving, and basic science while providing sensory exploration.",
    ageRange: "3-8",
    duration: "30 min",
    tags: ["science", "sensory", "messy", "special"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "together",
    interests: ["science"]
  },
  {
    title: "Feelings Charades",
    materials: [
      { emoji: "😊", name: "Emotion cards or ideas" },
      { emoji: "⏰", name: "Timer (optional)" }
    ],
    steps: [
      "Take turns picking an emotion to act out",
      "Use face and body to show the feeling",
      "Others guess the emotion being portrayed"
    ],
    whyGreat: "Develops emotional intelligence and empathy while having fun with expression.",
    ageRange: "4-10",
    duration: "15 min",
    tags: ["social-emotional", "game", "calm", "no-mess", "none"],
    energyLevel: "calm",
    location: "indoor",
    whoPlaying: "group",
    interests: ["games"]
  },
  {
    title: "Nature Art Collage",
    materials: [
      { emoji: "🍃", name: "Leaves, flowers, twigs" },
      { emoji: "📄", name: "Paper or cardboard" },
      { emoji: "🧴", name: "Glue" }
    ],
    steps: [
      "Collect natural materials from outside",
      "Arrange items into pictures or patterns",
      "Glue down to create nature artwork"
    ],
    whyGreat: "Connects kids with nature while developing artistic skills and appreciation for natural beauty.",
    ageRange: "3-8",
    duration: "30 min",
    tags: ["arts", "nature", "creative", "little-mess", "basic"],
    energyLevel: "calm",
    location: "outdoor",
    whoPlaying: "together",
    interests: ["arts", "outdoor"]
  },
  // === 6-8 YEAR OLD FOCUSED ACTIVITIES ===
  {
    title: "Secret Code Messages",
    materials: [
      { emoji: "📝", name: "Paper and pencils" },
      { emoji: "🔤", name: "Code wheel or cipher" },
      { emoji: "🔍", name: "Magnifying glass (optional)" }
    ],
    steps: [
      "Create a simple cipher (A=1, B=2 or shift letters)",
      "Write secret messages to each other",
      "Decode messages and complete spy missions"
    ],
    whyGreat: "Combines literacy skills with problem-solving and adds excitement to reading and writing practice.",
    ageRange: "6-8",
    minAge: 6,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "30 min",
    tags: ["educational", "literacy", "problem-solving", "no-mess", "basic"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "together",
    interests: ["reading", "games"]
  },
  {
    title: "Math Scavenger Hunt",
    materials: [
      { emoji: "📋", name: "Math challenge list" },
      { emoji: "✏️", name: "Pencil" },
      { emoji: "🏠", name: "Items around house" }
    ],
    steps: [
      "Create math challenges: 'Find 3 things that make 10 when added'",
      "Search house for items that solve each problem",
      "Check answers together and celebrate victories"
    ],
    whyGreat: "Makes math practical and fun while encouraging movement and real-world application.",
    ageRange: "6-8",
    minAge: 6,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "30 min",
    tags: ["educational", "math", "active", "no-mess", "basic"],
    energyLevel: "active",
    location: "indoor",
    whoPlaying: "alone",
    interests: ["science"]
  },
  {
    title: "Comic Book Creation",
    materials: [
      { emoji: "📔", name: "Paper folded into panels" },
      { emoji: "✏️", name: "Pencils and markers" },
      { emoji: "💭", name: "Speech bubble templates" }
    ],
    steps: [
      "Fold paper to create comic panels",
      "Plan your story with beginning, middle, end",
      "Draw characters and add speech bubbles"
    ],
    whyGreat: "Develops storytelling, sequencing, and artistic skills while creating something to be proud of.",
    ageRange: "6-8",
    minAge: 6,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "45 min",
    tags: ["creative", "writing", "arts", "no-mess", "basic"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "alone",
    interests: ["arts", "reading", "creative"]
  },
  {
    title: "Backyard Olympics",
    materials: [
      { emoji: "🏃", name: "Timer or stopwatch" },
      { emoji: "🎯", name: "Targets (buckets, hula hoops)" },
      { emoji: "🏅", name: "Homemade medals" }
    ],
    steps: [
      "Set up 5 different events: long jump, ball toss, sprint, etc.",
      "Keep score for each event",
      "Award medals and celebrate all participants"
    ],
    whyGreat: "Builds physical fitness, good sportsmanship, and goal-setting in a fun competitive format.",
    ageRange: "6-8",
    minAge: 6,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "60 min",
    tags: ["sports", "competitive", "active", "no-mess", "basic"],
    energyLevel: "active",
    location: "outdoor",
    whoPlaying: "group",
    interests: ["sports", "outdoor"]
  },
  {
    title: "Science Sink or Float Lab",
    materials: [
      { emoji: "🪣", name: "Large container of water" },
      { emoji: "🔬", name: "Various objects to test" },
      { emoji: "📊", name: "Chart for predictions" }
    ],
    steps: [
      "Gather 10 different objects",
      "Predict and chart: will it sink or float?",
      "Test each item and discuss why"
    ],
    whyGreat: "Introduces scientific method, hypothesis testing, and properties of matter in hands-on way.",
    ageRange: "6-8",
    minAge: 6,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "30 min",
    tags: ["science", "educational", "experiment", "little-mess", "basic"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "together",
    interests: ["science"]
  },
  {
    title: "Word Building Race",
    materials: [
      { emoji: "🔤", name: "Letter tiles or cards" },
      { emoji: "⏰", name: "Timer" },
      { emoji: "📝", name: "Word list for checking" }
    ],
    steps: [
      "Spread out letter tiles",
      "Set timer for 2 minutes",
      "Build as many real words as possible"
    ],
    whyGreat: "Reinforces spelling, vocabulary, and quick thinking while making literacy competitive and fun.",
    ageRange: "6-8",
    minAge: 6,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "15 min",
    tags: ["educational", "literacy", "competitive", "no-mess", "basic"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "group",
    interests: ["reading", "games"]
  },
  {
    title: "DIY Mini Golf Course",
    materials: [
      { emoji: "📦", name: "Cardboard and boxes" },
      { emoji: "🏌️", name: "Toy golf club or stick" },
      { emoji: "⚾", name: "Small ball" }
    ],
    steps: [
      "Design obstacles using household items",
      "Create ramps, tunnels, and challenges",
      "Play through your custom course"
    ],
    whyGreat: "Combines engineering, physics concepts, and active play with creative problem-solving.",
    ageRange: "6-8",
    minAge: 6,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "60 min",
    tags: ["building", "creative", "active", "little-mess", "basic"],
    energyLevel: "active",
    location: "indoor",
    whoPlaying: "together",
    interests: ["sports", "creative"]
  },
  {
    title: "Neighborhood Map Making",
    materials: [
      { emoji: "🗺️", name: "Large paper" },
      { emoji: "🖍️", name: "Colored pencils" },
      { emoji: "📏", name: "Ruler" }
    ],
    steps: [
      "Walk around your street observing landmarks",
      "Draw a bird's eye view map",
      "Add compass rose, legend, and special places"
    ],
    whyGreat: "Develops spatial awareness, observation skills, and introduces basic geography concepts.",
    ageRange: "6-8",
    minAge: 6,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "45 min",
    tags: ["educational", "geography", "creative", "no-mess", "basic"],
    energyLevel: "calm",
    location: "outdoor",
    whoPlaying: "together",
    interests: ["science", "creative"]
  },
  {
    title: "Origami Challenge",
    materials: [
      { emoji: "📄", name: "Square paper" },
      { emoji: "📖", name: "Origami instructions" },
      { emoji: "🎨", name: "Markers for decorating" }
    ],
    steps: [
      "Start with simple shapes: cup, hat, boat",
      "Follow step-by-step folding instructions",
      "Create a whole origami zoo or scene"
    ],
    whyGreat: "Builds fine motor skills, spatial reasoning, and patience while creating art from simple paper.",
    ageRange: "6-8",
    minAge: 6,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "30 min",
    tags: ["arts", "focus", "calm", "no-mess", "basic"],
    energyLevel: "calm",
    location: "indoor",
    whoPlaying: "alone",
    interests: ["arts", "creative"]
  },
  {
    title: "Fraction Pizza Kitchen",
    materials: [
      { emoji: "🍕", name: "Paper plates" },
      { emoji: "🖍️", name: "Markers" },
      { emoji: "✂️", name: "Scissors" }
    ],
    steps: [
      "Draw pizzas on paper plates",
      "Cut into halves, quarters, eighths",
      "Play restaurant taking fraction orders"
    ],
    whyGreat: "Makes abstract fraction concepts concrete and delicious while incorporating imaginative play.",
    ageRange: "6-8",
    minAge: 6,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "30 min",
    tags: ["educational", "math", "creative", "no-mess", "basic"],
    energyLevel: "calm",
    location: "indoor",
    whoPlaying: "together",
    interests: ["science"]
  },
  {
    title: "Capture the Flag",
    materials: [
      { emoji: "🚩", name: "Two different colored flags/bandanas" },
      { emoji: "🏃", name: "Open space" },
      { emoji: "⭕", name: "Boundary markers" }
    ],
    steps: [
      "Divide into two teams with territories",
      "Hide flags in each territory",
      "Try to capture opponent's flag and return to base"
    ],
    whyGreat: "Classic game that builds strategy, teamwork, and provides excellent physical exercise.",
    ageRange: "6-8",
    minAge: 6,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "45 min",
    tags: ["games", "strategy", "active", "no-mess", "basic"],
    energyLevel: "active",
    location: "outdoor",
    whoPlaying: "group",
    interests: ["sports", "games"]
  },
  {
    title: "Weather Station Scientist",
    materials: [
      { emoji: "🌡️", name: "Thermometer" },
      { emoji: "💨", name: "Ribbon for wind direction" },
      { emoji: "📊", name: "Weather chart" }
    ],
    steps: [
      "Set up simple weather tools outside",
      "Record temperature, wind, clouds daily",
      "Make predictions and track patterns"
    ],
    whyGreat: "Introduces meteorology, data collection, and pattern recognition through real science.",
    ageRange: "6-8",
    minAge: 6,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "15 min",
    tags: ["science", "educational", "observation", "no-mess", "basic"],
    energyLevel: "calm",
    location: "outdoor",
    whoPlaying: "alone",
    interests: ["science", "outdoor"]
  },
  {
    title: "Drama Improv Games",
    materials: [
      { emoji: "🎭", name: "Props box (hats, scarves)" },
      { emoji: "📝", name: "Scenario cards" }
    ],
    steps: [
      "Pick a scenario: 'You're on a sinking ship!'",
      "Act out the scene making it up as you go",
      "Yes, and... accept ideas and build on them"
    ],
    whyGreat: "Builds confidence, quick thinking, and public speaking skills in a fun, supportive way.",
    ageRange: "6-8",
    minAge: 6,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "30 min",
    tags: ["drama", "creative", "social", "no-mess", "basic"],
    energyLevel: "silly",
    location: "indoor",
    whoPlaying: "group",
    interests: ["creative"]
  },
  {
    title: "Marble Run Engineering",
    materials: [
      { emoji: "🧻", name: "Paper towel tubes" },
      { emoji: "📦", name: "Cardboard pieces" },
      { emoji: "🏀", name: "Marbles or small balls" }
    ],
    steps: [
      "Design a path from top to bottom",
      "Tape tubes and ramps to wall or cardboard",
      "Test and redesign for best marble run"
    ],
    whyGreat: "Teaches physics, cause-and-effect, and engineering design process through trial and error.",
    ageRange: "6-8",
    minAge: 6,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "45 min",
    tags: ["building", "science", "problem-solving", "little-mess", "basic"],
    energyLevel: "focused",
    location: "indoor",
    whoPlaying: "alone",
    interests: ["science", "creative"]
  },
  {
    title: "Restaurant Role Play",
    materials: [
      { emoji: "📝", name: "Menu and order pad" },
      { emoji: "🍽️", name: "Play food or drawings" },
      { emoji: "💵", name: "Play money" }
    ],
    steps: [
      "Create menus with prices",
      "Take turns being waiter, chef, customer",
      "Practice ordering, serving, and paying"
    ],
    whyGreat: "Develops social skills, money math, and writing while exploring real-world scenarios.",
    ageRange: "6-8",
    minAge: 6,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "30 min",
    tags: ["pretend-play", "social", "math", "no-mess", "basic"],
    energyLevel: "calm",
    location: "indoor",
    whoPlaying: "together",
    interests: ["creative"]
  },
  {
    title: "Time Capsule Project",
    materials: [
      { emoji: "📦", name: "Shoebox or container" },
      { emoji: "📸", name: "Photos and drawings" },
      { emoji: "✏️", name: "Letter-writing materials" }
    ],
    steps: [
      "Write letter to future self",
      "Add current favorites list and photos",
      "Seal and hide to open in one year"
    ],
    whyGreat: "Encourages reflection, writing skills, and creates meaningful family memories.",
    ageRange: "6-8",
    minAge: 6,
    maxAge: 8,
    developmentStage: "early-elementary",
    duration: "45 min",
    tags: ["creative", "writing", "meaningful", "no-mess", "basic"],
    energyLevel: "calm",
    location: "indoor",
    whoPlaying: "together",
    interests: ["creative", "reading"]
  }
];

export async function seedDatabase() {
  console.log("Seeding database with activities...");
  
  // Check if activities already exist
  const existingActivities = await db.select().from(activities).limit(1);
  if (existingActivities.length > 0) {
    console.log("Activities already exist, skipping seed...");
    return;
  }
  
  try {
    await db.insert(activities).values(seedActivities);
    console.log(`Successfully seeded ${seedActivities.length} activities`);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}