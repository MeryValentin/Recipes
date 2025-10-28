// Shared dataset with image filenames
const RECIPES = [
  {
    id: 'brownies',
    title: 'Classic Chocolate Brownies',
    categories: ['Classic Cakes','Chocolate Lovers','Quick & Easy'],
    yieldParts: 12,
    difficulty: 'Easy',
    image: 'brownies.jpg',
    ingredients: [
      '1 cup unsweetened cocoa powder',
      '1 1/2 cups granulated sugar',
      '1/2 cup unsalted butter (melted)',
      '3 large eggs',
      '1 cup all-purpose flour',
      '2 tsp vanilla extract',
      '1/2 tsp salt',
      '1/2 cup chocolate chips (optional)'
    ],
    steps: [
      'Preheat oven to 350°F (175°C) and grease an 8x8-inch baking pan.',
      'In a saucepan over low heat, melt the butter. Stir in sugar until well combined.',
      'Remove from heat and whisk in eggs one at a time, followed by vanilla extract.',
      'In a separate bowl, sift together cocoa powder, flour, and salt.',
      'Gradually fold the dry mixture into the wet mixture; avoid overmixing.',
      'Add chocolate chips if desired, then pour batter into the prepared pan.',
      'Bake for 20-25 minutes or until a toothpick comes out with moist crumbs.'
    ]
  },
  {
    id: 'baguette',
    title: 'Traditional French Baguettes (6 loaves)',
    categories: ['French Recipes','Classic Cakes'],
    yieldParts: 6,
    difficulty: 'Intermediate',
    image: 'baguette.jpg',
    ingredients: [
      '1 kg bread flour (T65 or equivalent)',
      '700 g water',
      '16 g fresh yeast (or 8 g active dry yeast)',
      '22 g salt'
    ],
    steps: [
      'First mixing: combine flour and water on low speed for 1 minute ("frasage").',
      'Add salt and yeast; knead at low speed for 5 minutes.',
      'Cover and let rest 20 minutes, repeating folds and rests for ~1 hour total.',
      'Shape, proof and bake at 250°C with steam for ~15 minutes.'
    ]
  },
  {
    id: 'painsauchoc',
    title: 'Pain au Chocolat / Croissants (makes ~12)',
    categories: ['French Recipes','Celebration Cakes'],
    yieldParts: 12,
    difficulty: 'Advanced',
    image: 'painsauchoc.jpg',
    ingredients: [
      '500 g all-purpose flour',
      '20 g fresh baker\'s yeast',
      '300 g cold butter (for laminating)',
      '125 ml warm milk',
      '60 g granulated sugar',
      '5 g fine salt',
      '125 ml cold water',
      'Chocolate batons or bars for filling'
    ],
    steps: [
      'Warm the milk slightly and dissolve the yeast. Mix dough and let rise 1–2 hours.',
      'Enclose butter and laminate the dough with folds and chills (3 turns).',
      'Cut, shape, fill with chocolate, proof ~1.5 hours and bake at 180°C for 12–15 minutes.'
    ]
  },
  {
    id: 'madeleines',
    title: 'Chocolate-coated Madeleines (10 pieces)',
    categories: ['Classic Cakes','French Recipes','Quick & Easy'],
    yieldParts: 10,
    difficulty: 'Easy',
    image: 'madeleines.jpg',
    ingredients: [
      '3 large eggs',
      '150 g granulated sugar',
      '150 g all-purpose flour',
      '150 g melted butter',
      '1 tsp vanilla extract',
      '100 g dark chocolate (for coating)'
    ],
    steps: [
      'Preheat oven and prepare a greased madeleine pan.',
      'Whisk eggs and sugar until light and fluffy. Fold in flour and melted butter, add vanilla.',
      'Spoon batter into molds and bake 10–12 minutes. Dip cooled madeleines in melted chocolate.'
    ]
  }
];

// Number parsing & scaling helpers
function parseNumberToken(token){
  token = token.trim();
  if(token.includes(' ')){
    const parts = token.split(' ');
    if(parts.length===2 && parts[1].includes('/')){
      const whole = parseFloat(parts[0]);
      const frac = parts[1].split('/');
      return whole + (parseFloat(frac[0])/parseFloat(frac[1]));
    }
  }
  if(token.includes('/')){
    const frac = token.split('/');
    return parseFloat(frac[0])/parseFloat(frac[1]);
  }
  return parseFloat(token);
}
function formatNumberForDisplay(n){
  if(n===Math.floor(n)) return String(n);
  const frac = n - Math.floor(n);
  if(Math.abs(frac-0.5)<0.0001) return Math.floor(n) + ' 1/2';
  return (Math.round(n*100)/100).toString();
}
function scaleAnyNumberInString(text,factor){
  return text.replace(/(\d+\s\d+\/\d+|\d+\/\d+|\d+\.\d+|\d+)/g,m=>{
    const num = parseNumberToken(m);
    if(isNaN(num)) return m;
    const scaled = num * factor;
    return formatNumberForDisplay(Math.round((scaled + Number.EPSILON) * 100) / 100);
  });
}

// expose to pages
window.RECIPES = RECIPES;
window.scaleAnyNumberInString = scaleAnyNumberInString;
