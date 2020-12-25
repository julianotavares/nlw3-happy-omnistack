import Orphanage from '../models/Orphanages';
import imagesView from '../views/imagesView';

export default {
  render(orphanage: Orphanage){
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: Number(orphanage.latitude),
      longitude: Number(orphanage.longitude),
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekend: orphanage.open_on_weekend,
      images: imagesView.renderMany(orphanage.images),
    };
  },

  renderMany( orphanages: Orphanage[]) {
    return orphanages.map(orphanage=> this.render(orphanage));
  }
}