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
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal);

  }
   
   /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
   
    for (const vampire of this.offspring) {
     const vampireSearch = vampire.vampireWithName(name);
     if(vampireSearch) {
       return vampireSearch;
     };
   }
   return null;
    }
   
    
     // Returns the total number of vampires that exist
    
       get totalDescendents() {
         let numOfDescendents = 0;
     
         for (const vampire of this.offspring) {
           numOfDescendents ++;
           const descendents = vampire.totalDescendents;
           numOfDescendents = numOfDescendents + descendents;
         }
         return numOfDescendents;
       }
     
       // Returns an array of all the vampires that were converted after 1980
       get allMillennialVampires() {
         let millenialVampires = [];
     
         if (this.yearConverted > 1980) {
           millenialVampires.push(this);
         }
         for (const vampire of this.offspring) {
           const currentVampire = vampire.allMillennialVampires;
           millenialVampires = millenialVampires.concat(currentVampire);
         }
         return millenialVampires;
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


module.exports = Vampire;

