# VKRI prototype

A clickable prototype of two connected interfaces for a destination wedding agency:

- a **planner CRM** (`planner/`): three weddings, three phases, nine steps, tasks, budget, guests, suppliers, inbox;
- a **couple portal** (`couple/`): what needs the couple, their budget and invoices, guests, documents and letters from the planners.

Open `index.html` and sign in with the login you were given (ask the person who sent you the link). Then choose a planner or a couple, or take the two-minute tour. The test sheet for testers is `test-tasks.html` (also `test-tasks.pdf`).

**This is demo data.** Every person, supplier and price is invented, including the prices shown next to real venues and hotels. Any resemblance of an invented supplier name to a real business is accidental. "Today" inside the prototype is always Monday 17 May 2027.

It is a prototype, not a product: the sign-in page keeps casual visitors out but is not real security (the site is static and public), and nothing is sent anywhere. Each visitor's changes stay in their own browser; "Reset demo data" on the first page puts everything back.

To share one set of data between a laptop and a phone on the same Wi-Fi, run `python3 serve.py` in this folder and open the addresses it prints.
