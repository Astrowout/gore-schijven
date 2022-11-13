export const getArtistsLine = (artists: any[]) => {
    let line = "";
  
    for (let i = 0; i < artists.length; i++) {
      const artist = artists[i];
  
      if (i > 0) {
        line += `, ${artist.name}`
      } else {
        line += artist.name;
      }
    }
  
    return line;
}