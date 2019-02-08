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
    let n = 0;
    let current = this;
    while (current.creator !== null) {
      current = this.creator;
      n++;
    }
    return n;
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
    this.offspring.forEach(child => {
      child.vampireWithName(name);
    })
    return null;


  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let n = 0;
    this.offspring.forEach( child => {
      n++;
      let next = child.totalDescendents;
      n += next;
    })
    return n;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let result = [];
    if (this.yearConverted > 1980) {
      result.push(this);
    }
    this.offspring.forEach(child => {
      let next = child.allMillennialVampires;
      result = result.concat(next);

    })
    return result;
  }

  /** Stretch **/
  
  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.

  closestCommonAncestor(vampire) {
    let current = this;
    while (current.creator !== null) {
      if (current.creator !== vampire.creator) {
        current = this.creator;
      }
      else return current.creator;
    }
    while (vampire.creator !== null) {
      if (vampire.creator !== this.creator) {
        vampire = vampire.creator;
      }
      else return vampire.creator;
    }
}






}

module.exports = Vampire;

