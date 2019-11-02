class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let resName; // 1

    if (this.name === name) {
      return this;
    }

    if (this.offspring) {
      for (const m of this.offspring) {
        resName = m.vampireWithName(name);
        if (resName) {
          return resName;
        }
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {

    let total = 0;
    
    if (this.offspring.length) {
      for (const offspr of this.offspring) {
        total += offspr.totalDescendents + 1;
      }
    }
    return total;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenials = []; // 1

    if (this.yearConverted > 1980) {
      millenials.push(this); // 2
    }

    for (let i of this.offspring) {
      millenials = millenials.concat(i.allMillennialVampires);
    }

    return millenials;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {}
}

let magic = new Vampire('beet', 1982);
let riana = new Vampire('riana', 1982);
let electro = new Vampire('electro', 1982);
// let peter = new Vampire('peter', 1982)
// let hua = new Vampire('hua', 1982)

magic.addOffspring(riana);
magic.addOffspring(electro);
// magic.addOffspring(peter)
// magic.addOffspring(hua)

//console.log(magic)
console.log('magic name: ',magic.name);

magic.vampireWithName("electro");

module.exports = Vampire;