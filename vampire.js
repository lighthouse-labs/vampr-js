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

    // climb "up" the tree (using iteration), counting nodes, until no original is found
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    levelsThis = this.numberOfVampiresFromOriginal();
    levelsOther = vampire.numberOfVampiresFromOriginal();
    if (levelsThis > levelsOther) {
        return false;
    } else {
        return true;
    }

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

const sarah = new Vampire("Sarah", 1999);
const Elgort    = new Vampire("Ansel", 1800);
// const arvinder = new Vampire("Arvinder", "Chief Design Officer", 1000000);
// const angela   = new Vampire("Angela", "VP Retail", 1000000);
// const phil     = new Vampire("Phil", "VP Marketing", 1000000);

sarah.addOffspring(Elgort);
// ada.addSubordinate(arvinder);
// ada.addSubordinate(angela);
// ada.addSubordinate(phil);

module.exports = Vampire;

