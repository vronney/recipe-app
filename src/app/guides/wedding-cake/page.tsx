'use client';

import Image from 'next/image';

export default function WeddingCakeGuide() {
  return (
    <>
      <style jsx global>{`
        body {
          background-color: #fdf8f2;
          color: #3e2723;
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
        }
        h1, h2, h3 {
          font-family: Georgia, "Times New Roman", serif;
          color: #C65D21;
        }
        h1 {
          text-align: center;
          font-size: 2em;
          margin: 0.5em 0;
        }
        h2 {
          font-size: 1.5em;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          border-bottom: 2px solid #C65D21;
          padding-bottom: 0.2em;
        }
        h3 {
          font-size: 1.2em;
          margin: 1em 0 0.3em 0;
        }
        /* Layout */
        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          padding: 1em;
          gap: 2em;
        }
        #toc {
          flex: 0 0 200px;
          position: sticky;
          top: 1em;
          align-self: flex-start;
          background: #f3e8df;
          border: 1px solid #e0d6cc;
          border-radius: 8px;
          padding: 1em;
        }
        #toc ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        #toc li {
          margin: 0.5em 0;
        }
        #toc a {
          text-decoration: none;
          color: #C65D21;
        }
        #toc a:hover {
          text-decoration: underline;
        }
        main {
          flex: 1;
          max-width: 800px;
        }
        /* Interactive elements */
        .checklist {
          list-style: none;
          padding-left: 0;
          margin-bottom: 1em;
        }
        .checklist li {
          margin: 0.25em 0;
        }
        .checklist input[type="checkbox"] {
          margin-right: 0.5em;
          transform: scale(1.2);
          accent-color: #C65D21;
        }
        details {
          margin: 0.5em 0;
        }
        details summary {
          cursor: pointer;
          font-weight: bold;
        }
        details p {
          margin: 0.5em 0 0.5em 1em;
        }
        /* Image styling */
        figure {
          text-align: center;
          margin: 1em 0;
        }
        figure img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
        }
        figure figcaption {
          font-size: 0.9em;
          color: #5a4633;
          margin-top: 0.5em;
        }
        /* Print styles */
        @media print {
          #toc, .print-btn {
            display: none;
          }
          body {
            background: #fff;
            color: #000;
          }
          h1, h2, h3 {
            color: #000;
          }
        }
        /* Responsive: stack nav on mobile */
        @media (max-width: 768px) {
          .content-wrapper {
            flex-direction: column;
          }
          #toc {
            position: relative;
            width: auto;
            margin-bottom: 1em;
          }
          #toc ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          #toc li {
            margin: 0.25em 0.5em;
          }
          #toc a {
            padding: 0.2em 0.4em;
            background: #C65D21;
            color: #fff;
            border-radius: 4px;
          }
          #toc a:hover {
            background: #a84a1c;
            color: #fff;
            text-decoration: none;
          }
        }
      `}</style>

      <header>
        <h1>Autumn 3-Tier Wedding Cake Guide</h1>
        <div className="print-btn" style={{ textAlign: 'center', marginBottom: '1em' }}>
          <button
            onClick={() => window.print()}
            style={{
              background: '#C65D21',
              color: '#fff',
              border: 'none',
              padding: '0.5em 1em',
              borderRadius: '4px',
              fontSize: '1em',
              cursor: 'pointer'
            }}
          >
            Print Recipe
          </button>
        </div>
      </header>

      <div className="content-wrapper">
        <nav id="toc" aria-label="Table of contents">
          <ul>
            <li><a href="#overview">Overview</a></li>
            <li><a href="#supplies">Supplies &amp; Equipment</a></li>
            <li><a href="#ingredients">Ingredient Lists</a></li>
            <li><a href="#baking">Baking Instructions</a></li>
            <li><a href="#decorating">Decorating &amp; Assembly</a></li>
            <li><a href="#portions">Portion Guidelines</a></li>
            <li><a href="#transport">Transport Tips</a></li>
          </ul>
        </nav>

        <main>
          {/* Overview Section */}
          <section id="overview">
            <h2>Overview</h2>
            <figure>
              <Image
                src="/images/fall-wedding-cake.png"
                alt="Three-tier fall-themed wedding cake with autumn flowers"
                width={800}
                height={600}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }}
              />
              <figcaption>An example of a finished 3-tier fall-themed wedding cake decorated with autumn flowers.</figcaption>
            </figure>
            <p>This guide will walk you through creating a beautiful three-tier <strong>autumn-themed wedding cake</strong> that serves approximately <strong>100 guests</strong>. We&apos;ll cover everything from gathering supplies and baking each tier, to stacking, decorating, and transporting the cake. By following these step-by-step instructions, even a home baker can assemble an elegant wedding cake with confidence.</p>
            <p>Our cake will have tiers of <em>6 inches, 8 inches, and 10 inches</em> in diameter. Each tier consists of two layers (baked separately and later stacked). In total, this size cake typically provides about 100 servings. The design will feature warm autumn colors (think <span style={{ color: '#C65D21', fontWeight: 'bold' }}>burnt orange</span>, cream, and brown accents) and simple yet elegant decorations to match a fall wedding theme.</p>
            <p><em>Note:</em> Feel free to adapt the cake flavors or colors to your preference – the instructions here focus on technique and structure, which will apply to any flavor of cake or buttercream.</p>
          </section>

          {/* Supplies & Equipment Section */}
          <section id="supplies">
            <h2>Supplies &amp; Equipment</h2>
            <p>Gather the following tools and supplies before you begin. You can use the checkboxes to keep track:</p>
            <ul className="checklist">
              <li><label><input type="checkbox" /> 6-inch, 8-inch, and 10-inch round cake pans (preferably 3-inch deep)</label></li>
              <li><label><input type="checkbox" /> Parchment paper rounds for the pans</label></li>
              <li><label><input type="checkbox" /> Oven thermometer (to ensure accurate baking temperature)</label></li>
              <li><label><input type="checkbox" /> Stand mixer (or electric hand mixer) and large mixing bowls</label></li>
              <li><label><input type="checkbox" /> Measuring cups and spoons; kitchen scale (optional for accuracy)</label></li>
              <li><label><input type="checkbox" /> 14-inch serrated knife (for leveling cake layers)</label></li>
              <li><label><input type="checkbox" /> Rotating cake turntable (for easier frosting)</label></li>
              <li><label><input type="checkbox" /> Offset spatula and straight spatula (for applying frosting)</label></li>
              <li><label><input type="checkbox" /> Bench scraper or cake smoother (for smoothing frosting)</label></li>
              <li><label><input type="checkbox" /> Cake boards: 6-inch and 8-inch cardboard rounds, and a sturdy drum (10–12 inch) for the bottom tier</label></li>
              <li><label><input type="checkbox" /> Wooden or plastic dowels (for supporting upper tiers)</label></li>
              <li><label><input type="checkbox" /> Pastry bags and piping tips (for decorative borders or details)</label></li>
              <li><label><input type="checkbox" /> Refrigerator space (to chill cakes and frosting)</label></li>
              <li><label><input type="checkbox" /> Large cake box or carrier for transport</label></li>
              <li><label><input type="checkbox" /> Non-slip mat (to place under the cake during transport)</label></li>
              <li><label><input type="checkbox" /> Optional decor: fresh or silk flowers, ribbons, cake topper, etc.</label></li>
            </ul>
          </section>

          {/* Ingredient Lists Section */}
          <section id="ingredients">
            <h2>Ingredient Lists</h2>
            <p>Below are the ingredients needed for each tier of the cake, as well as the frosting. The recipe is for a classic vanilla butter cake, which can be easily adapted with flavorings or color. The ingredient amounts are listed per tier; remember that each tier will be a two-layer cake. You can check off items as you measure them out:</p>
            <h3>Top Tier (6-inch round, 2 layers)</h3>
            <ul className="checklist">
              <li><label><input type="checkbox" /> 2 1/4 cups all-purpose flour</label></li>
              <li><label><input type="checkbox" /> 1 1/3 cups granulated sugar</label></li>
              <li><label><input type="checkbox" /> 1/2 cup unsalted butter, softened (1 stick)</label></li>
              <li><label><input type="checkbox" /> 2 large eggs, at room temperature</label></li>
              <li><label><input type="checkbox" /> 1 cup whole milk, at room temperature</label></li>
              <li><label><input type="checkbox" /> 1 Tbsp baking powder</label></li>
              <li><label><input type="checkbox" /> 1/2 tsp salt</label></li>
              <li><label><input type="checkbox" /> 1 Tbsp pure vanilla extract</label></li>
            </ul>
            <h3>Middle Tier (8-inch round, 2 layers)</h3>
            <ul className="checklist">
              <li><label><input type="checkbox" /> 4 1/2 cups all-purpose flour</label></li>
              <li><label><input type="checkbox" /> 2 2/3 cups granulated sugar</label></li>
              <li><label><input type="checkbox" /> 1 cup unsalted butter, softened (2 sticks)</label></li>
              <li><label><input type="checkbox" /> 4 large eggs, at room temperature</label></li>
              <li><label><input type="checkbox" /> 2 cups whole milk, at room temperature</label></li>
              <li><label><input type="checkbox" /> 2 Tbsp baking powder</label></li>
              <li><label><input type="checkbox" /> 1 tsp salt</label></li>
              <li><label><input type="checkbox" /> 2 Tbsp pure vanilla extract</label></li>
            </ul>
            <h3>Bottom Tier (10-inch round, 2 layers)</h3>
            <ul className="checklist">
              <li><label><input type="checkbox" /> 6 3/4 cups all-purpose flour</label></li>
              <li><label><input type="checkbox" /> 4 cups granulated sugar</label></li>
              <li><label><input type="checkbox" /> 1 1/2 cups unsalted butter, softened (3 sticks)</label></li>
              <li><label><input type="checkbox" /> 6 large eggs, at room temperature</label></li>
              <li><label><input type="checkbox" /> 3 cups whole milk, at room temperature</label></li>
              <li><label><input type="checkbox" /> 3 Tbsp baking powder</label></li>
              <li><label><input type="checkbox" /> 1 1/2 tsp salt</label></li>
              <li><label><input type="checkbox" /> 3 Tbsp pure vanilla extract</label></li>
            </ul>
            <h3>Buttercream Frosting (for entire cake)</h3>
            <ul className="checklist">
              <li><label><input type="checkbox" /> ~18 cups buttercream frosting (total needed)</label></li>
              <li><label><input type="checkbox" /> 6 cups (3 lbs) unsalted butter, softened</label></li>
              <li><label><input type="checkbox" /> ~16 cups powdered sugar (confectioners&apos; sugar)</label></li>
              <li><label><input type="checkbox" /> 6–8 Tbsp milk or cream (as needed for consistency)</label></li>
              <li><label><input type="checkbox" /> 2 Tbsp pure vanilla extract</label></li>
              <li><label><input type="checkbox" /> Pinch of salt (to taste, balances sweetness)</label></li>
              <li><label><input type="checkbox" /> (Optional) Food coloring in autumn shades (e.g., orange) for accents</label></li>
            </ul>
            <p><em>Note:</em> The frosting amounts above are for a standard American buttercream. You can use your preferred frosting recipe; just be sure to make enough to fill, crumb-coat, and decorate all three tiers. If you plan to have a filling between cake layers (such as fruit preserves or pastry cream), prepare about 4–5 cups of filling of your choice.</p>
          </section>

          {/* Baking Instructions Section */}
          <section id="baking">
            <h2>Step-by-Step Baking Instructions</h2>
            <p>Now let&apos;s bake the cake layers. We will make each tier separately (starting with the ingredients listed above for each tier). If you have multiple pans and a large oven, you can bake tiers simultaneously; otherwise, bake them one tier at a time. Follow these steps for each set of cake layers:</p>
            <details open>
              <summary>Step 1: Preheat and Prepare Pans</summary>
              <p>Preheat your oven to <strong>350°F (175°C)</strong>. Position the oven rack in the center. Grease the cake pans with butter or cooking spray. Line the bottom of each pan with a circle of parchment paper, then grease the parchment as well. This extra step ensures the cakes release easily.</p>
            </details>
            <details>
              <summary>Step 2: Make the Cake Batter</summary>
              <p>In a large bowl (or the bowl of a stand mixer), <strong>cream the butter and sugar</strong> together until light and fluffy. Add the eggs one at a time, beating well after each addition. Mix in the vanilla extract.</p>
              <p>In a separate bowl, whisk together the flour, baking powder, and salt. Add half of the dry ingredients to the butter mixture and mix on low speed. Pour in the milk and continue mixing, then add the remaining dry ingredients. Mix until just combined and smooth. Avoid over-mixing (over-mixing can cause a dense cake).</p>
            </details>
            <details>
              <summary>Step 3: Bake the Layers</summary>
              <p>Divide the batter evenly between the prepared pans for that tier. Smooth the tops with a spatula. Bake the cakes at 350°F until a toothpick inserted in the center comes out clean (or with just a few moist crumbs). Approximate baking times:</p>
              <ul>
                <li>6-inch layers: about <strong>25–30 minutes</strong></li>
                <li>8-inch layers: about <strong>35–40 minutes</strong></li>
                <li>10-inch layers: about <strong>55–60 minutes</strong></li>
              </ul>
              <p>Cake tops should be golden and just pulling away from the pan sides. If unsure, start checking a few minutes early. Ovens can vary, so use the toothpick test and look for springy tops.</p>
            </details>
            <details>
              <summary>Step 4: Cool the Cakes</summary>
              <p>Let the cakes cool in their pans for about 10 minutes. Then run a knife around the edges and carefully invert each layer onto a cooling rack. Peel off the parchment liner. Allow the cakes to cool completely to room temperature. (Warm cakes will melt frosting, so this is important!)</p>
              <p><em>Make-Ahead Tip:</em> You can bake the cake layers a day or two in advance. Once completely cooled, wrap each layer tightly in plastic wrap. Store them at room temperature overnight, or freeze them (in airtight wrap) for longer storage. Chilled or frozen cake layers are easier to level and frost, as they are firmer and less crumbly.</p>
            </details>
          </section>

          {/* Decorating & Assembly Section */}
          <section id="decorating">
            <h2>Decorating &amp; Assembly Instructions</h2>
            <p>With all the cake layers baked and cooled, it&apos;s time to level, fill, and stack the tiers. Ensure you have your frosting ready (at room temperature for easy spreading). If you made the cakes in advance and froze them, you can work with them slightly chilled for easier handling. Follow these steps to assemble and decorate the cake:</p>
            <details open>
              <summary>Step 1: Level the Cake Layers</summary>
              <p>Use a long serrated knife to trim the dome from the top of each cake layer, creating a flat, even surface. (You can nibble on these delicious scraps or save them for cake pops!) Flat layers stack more securely and prevent a leaning cake. If desired, you can also <strong>torte</strong> the layers (split each layer horizontally to create two thinner layers) – this is optional and only needed if you want extra filling layers.</p>
            </details>
            <details>
              <summary>Step 2: Fill the Layers (Optional)</summary>
              <p>If you are adding a filling (like jam, lemon curd, or mousse) between layers, pipe a ring of buttercream around the top edge of the bottom layer to act as a dam. Spread an even layer of your filling inside this dam, then place the next cake layer on top. (If not using a separate filling, you can simply spread a layer of buttercream between each cake layer.) For the top of each tier, flip the uppermost layer upside down so that the very flat bottom of the cake is on top – this gives a flat surface for frosting.</p>
            </details>
            <details>
              <summary>Step 3: Crumb Coat Each Tier</summary>
              <p>Apply a thin layer of buttercream to the top and sides of each tier – this is the <em>crumb coat</em>. It traps any loose crumbs and primes the cake for the final frosting layer. Don&apos;t worry if it looks messy. Once each tier is crumb-coated, place them in the refrigerator for about 20–30 minutes to let the frosting firm up.</p>
            </details>
            <details>
              <summary>Step 4: Frost and Smooth Tiers</summary>
              <p>After chilling, retrieve one tier at a time. Apply a thicker layer of buttercream to the top and sides of the tier. Use an offset spatula to spread it evenly. Then use your bench scraper or cake smoother while rotating the cake on a turntable to get clean, smooth sides. You can aim for a perfectly smooth look or a rustic semi-naked style (scraping off some frosting for cake layers to peek through) depending on your wedding theme. Return each frosted tier to the fridge to keep the buttercream set.</p>
            </details>
            <details>
              <summary>Step 5: Insert Dowels for Support</summary>
              <p>For the bottom and middle tiers, insert support dowels before stacking. Cut dowels (wooden or plastic) to match the height of the tier (the frosted cake). For each of those tiers, insert about <strong>3 dowels</strong> spaced evenly in a triangle formation into the cake. Push each dowel straight down until it&apos;s flush with the top of the frosting – these will bear the weight of the tiers above. Make sure the dowels in each tier are not taller than the frosting layer (trim if needed).</p>
            </details>
            <details>
              <summary>Step 6: Stack the Tiers</summary>
              <p>Assemble the cake on your sturdy base (the drum or bottom cake board). Start by placing the <strong>bottom tier</strong> (10-inch cake) centered on the drum. If you have parchment paper circles, you can put a circle the size of the next tier on top of the frosted bottom tier (this helps position the next tier and prevents the icing from sticking when you adjust it, but remember to remove the parchment afterward!). Center the <strong>middle tier</strong> (8-inch cake) on top of the bottom tier. Make sure it is centered and straight. Finally, add the <strong>top tier</strong> (6-inch cake) on top of the middle. Each tier should be sitting on its cardboard round which rests on the dowels of the tier below.</p>
              <p>If your cake design allows, you can also insert one long dowel down the center from the top tier through the bottom for extra stability (sharpen one end of a long dowel and gently hammer it through all tiers). This is optional but can help keep tiers aligned during transport.</p>
            </details>
            <details>
              <summary>Step 7: Final Decorations</summary>
              <p>Your cake is now assembled! Now it&apos;s time for finishing touches. Pipe a decorative border around the base of each tier (for example, small shells or pearls with buttercream) to hide the seam between tiers and any visible cake boards. Use any remaining buttercream to add swirls, rosettes, or other accents as desired. For an autumn theme, you might add fresh flowers in fall colors (like orange, deep red, and yellow blooms) or even small accents like edible gold leaves, tiny pumpkins, or fondant leaves.</p>
              <p>Be sure that any fresh flowers or greenery that touch the cake are food-safe: wrap stems in floral tape or use flower spikes/picks if inserting into the cake. Arrange these decorations on the cake, focusing on areas where tiers meet or around the top tier. Less can be more – a few well-placed flowers and a coordinating cake topper can create an elegant look.</p>
            </details>
            <p>Once decorated, step back and admire your work – the cake is ready for the big day! Keep the finished cake refrigerated (if using perishable fillings or if the room is warm) until it&apos;s time to transport it to the venue.</p>
          </section>

          {/* Portion Guidelines Section */}
          <section id="portions">
            <h2>Portion Guidelines</h2>
            <p>A three-tier cake (6&quot;, 8&quot;, 10&quot;) is generally perfect for about 100 guests. Here&apos;s how the servings typically break down by tier:</p>
            <ul>
              <li><strong>Top tier (6&quot;):</strong> ~20 servings</li>
              <li><strong>Middle tier (8&quot;):</strong> ~30 servings</li>
              <li><strong>Bottom tier (10&quot;):</strong> ~50 servings</li>
            </ul>
            <p>Wedding cake slices are traditionally 1 inch by 2 inches by the height of the cake (usually 4–5 inches tall). To maximize servings, the venue&apos;s catering team will usually cut the cake in a grid pattern or concentric circles. It&apos;s a good idea to provide a <strong>cutting guide</strong> to whoever is serving the cake, to ensure the pieces are cut consistently and you get the expected number of servings.</p>
            <p><em>Tip:</em> If you plan to save the top tier for your first anniversary (a common tradition), do not count those servings in your 100. You may want to have some extra cake (or kitchen cake sheets) if you need to feed exactly 100 guests without the top tier. It&apos;s always better to have a few extra slices than to run short.</p>
          </section>

          {/* Transport & On-Site Assembly Tips Section */}
          <section id="transport">
            <h2>Transport &amp; On-Site Assembly Tips</h2>
            <p>The cake is made and decorated – now the challenge is getting it to the venue safely! Here are some important tips for transporting a tiered cake and assembling on site if needed:</p>
            <ul>
              <li><strong>Chill the Cake:</strong> Before transport, refrigerate the fully assembled cake for at least an hour (or overnight, if buttercream-based). A chilled cake is firmer and less likely to shift or slide.</li>
              <li><strong>Use a Sturdy Base and Box:</strong> Ensure the cake is on a solid cake drum or base that can support its weight. Place the cake in a bakery box or clean cardboard box that&apos;s only slightly larger than the base. You can put a non-slip mat or non-skid padding under the cake inside the box to prevent sliding.</li>
              <li><strong>Flat Surface in Vehicle:</strong> Always transport the cake on a flat, level surface in your vehicle – the trunk or back of an SUV is ideal. Never place a tiered cake on a car seat or someone&apos;s lap. Clear the area so nothing can slide into the cake.</li>
              <li><strong>Keep it Cool:</strong> If possible, blast the air conditioning in the car to keep the environment cool. Warm temperatures can soften the frosting and make the cake unstable. Avoid direct sunlight on the cake box.</li>
              <li><strong>Drive Carefully:</strong> Drive slowly and take turns, stops, and starts very gently. Consider having someone ride along to keep an eye on the cake. Avoid steep hills and rough roads if you can.</li>
              <li><strong>Full Assembly vs. On-Site Assembly:</strong> If your cake is very heavy or you&apos;re nervous about transporting it fully stacked, you can transport the tiers separately and stack them at the venue. (For a 3-tier cake serving 100, many bakers do transport it assembled, but if you feel safer, do the bottom two tiers together and carry the top tier separately.) Bring along an emergency kit if assembling on site.</li>
              <li><strong>On-Site Touch-Up Kit:</strong> Whether you assemble on site or not, bring a kit with extra buttercream, a spatula, piping bag/tip, dowels, and any extra decorations. This way you can fix any smudges, add the top tier or any borders, and place flowers or the topper once you arrive.</li>
              <li><strong>Final Assembly at Venue:</strong> If you held off on stacking tiers, insert dowels and stack the cake at the venue as described earlier. After stacking, pipe a quick border around the base of tiers if needed to hide any gaps. Add any finishing touches like flowers that were removed for transport.</li>
            </ul>
            <p>By following these tips, you&apos;ll greatly reduce the chance of mishaps. Give yourself plenty of time for delivery and setup at the venue. Once the cake is safely in place on the cake table, you&apos;ve officially completed the cake! Congratulations – now enjoy the wedding and the cake-cutting celebration, knowing you successfully created a stunning three-tier wedding cake.</p>
          </section>
        </main>
      </div>
    </>
  );
}
