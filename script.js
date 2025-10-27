// Shared dataset plus helper functions (same recipes used earlier)
const RECIPES = [
  {
    id: 'brownies',
    title: 'Classic Chocolate Brownies',
    categories: ['Classic Cakes','Chocolate Lovers','Quick & Easy'],
    yieldParts: 12,
    difficulty: 'Easy',
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
    ingredients: [
      '1 kg bread flour (T65 or equivalent)',
      '700 g water',
      '16 g fresh yeast (or 8 g active dry yeast)',
      '22 g salt'
    ],
    steps: [
      'First mixing: in a stand mixer bowl combine flour and water on low speed for 1 minute ("frasage").',
      'Add salt and mix; add crumbled fresh yeast (if using dry yeast, rehydrate in 50 g warm water before adding). Knead at low speed for 5 minutes. The dough will be loose—this is normal.',
      'Cover and let rest 20 minutes at room temperature.',
      'On a floured surface, gently fold the dough by bringing the four corners to the center, return to the bowl and rest 20 minutes. Repeat this folding-rest cycle two more times (total ~1 hour of bulk fermentation).',
      'After bulk fermentation, shape into a ball and let rise 2 hours at ~20°C until doubled.',
      'Divide the dough into 6 equal pieces. Shape into baguettes, rest 10 minutes under a cloth, then shape again to form baguettes.',
      'Preheat oven to 250°C with a tray of water in the bottom (steam). Let baguettes proof 30 minutes (final proof).',
      'Score (slashes) across each baguette and bake ~15 minutes (adjust to taste). Cool before slicing.'
    ]
  },
  {
    id: 'painsauchoc',
    title: 'Pain au Chocolat / Croissants (makes ~12)',
    categories: ['French Recipes','Celebration Cakes'],
    yieldParts: 12,
    difficulty: 'Advanced',
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
      'Warm the milk slightly and dissolve the yeast in it. In a bowl, combine flour, salt, sugar, water and the milk+yeast mixture. Mix and knead until elastic.',
      'Cover and let rise 1–2 hours until doubled. Degas the dough, form a ball, make a shallow cross cut and chill 1 hour.',
      'Beat the butter into a square between parchment paper and chill. Enclose the butter in the dough and roll into a rectangle ~1 cm thick.',
      'Fold in thirds, turn 90°, chill 20 minutes. Repeat the fold & chill two more times (lamination). Ideally rest overnight.',
      'Roll dough thin (~3 mm) and cut rectangles for pain au chocolat or triangles for croissants. Place chocolate, roll, brush with egg wash and proof ~1.5 hours.',
      'Bake at 180°C for 12–15 minutes until golden. Cool and enjoy.'
    ]
  },
  {
    id: 'madeleines',
    title: 'Chocolate-coated Madeleines (10 pieces)',
    categories: ['Classic Cakes','French Recipes','Quick & Easy'],
    yieldParts: 10,
    difficulty: 'Easy',
    ingredients: [
      '3 large eggs',
      '150 g granulated sugar',
      '150 g all-purpose flour',
      '150 g melted butter',
      '1 tsp vanilla extract',
      '100 g dark chocolate (for coating)'
    ],
    steps: [
      'Preheat oven and prepare a greased madeleine pan. Many bakers prefer metal pans for a better rise and golden sides—grease with coconut oil or butter.',
      'Whisk eggs and sugar until light and fluffy. Fold in flour and melted butter gently, add vanilla.',
      'Spoon batter into madeleine molds and bake 10–12 minutes until golden and domed.',
      'Melt dark chocolate and dip cooled madeleines to make a chocolate shell. Let set and serve.'
    ]
  }
];

// --- number parsing & scaling helpers ---
function parseNumberToken(token){
  token = token.trim();
  if(!token) return NaN;
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
  if(Math.abs(frac-0.25)<0.0001) return Math.floor(n) + ' 1/4';
  if(Math.abs(frac-0.75)<0.0001) return Math.floor(n) + ' 3/4';
  return (Math.round(n*100)/100).toString();
}

function scaleAnyNumberInString(text, factor){
  return text.replace(/(\d+\s\d+\/\d+|\d+\/\d+|\d+\.\d+|\d+)/g, (m)=>{
    const num = parseNumberToken(m);
    if(isNaN(num)) return m;
    const scaled = num * factor;
    return formatNumberForDisplay(Math.round((scaled + Number.EPSILON) * 100) / 100);
  });
}

// expose to pages
window.RECIPES = RECIPES;
window.scaleAnyNumberInString = scaleAnyNumberInString;

// small convenience: if loaded directly, nothing else
