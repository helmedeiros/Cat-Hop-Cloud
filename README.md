# Cat Hop Cloud

A puzzle game for js13kGames where a black cat uses "luck energy" to hop between clouds. Built with vanilla JavaScript and fits under 13KB when zipped.

## Game Mechanics

- **Start**: Cat begins on cloud 0 with 100 luck points
- **Controls**: Press number keys (1-9) to jump that many clouds forward
- **Energy Cost**: Each jump of k clouds costs k luck points
- **Thunderclouds**: Red clouds with lightning cost 2 extra luck points when landed on
- **Goal**: Return to cloud 0 with maximum luck remaining
- **Game Over**: Running out of luck causes the cat to fall

## Controls

- **1-9**: Jump 1-9 clouds forward
- **R**: Reset the game
- **H**: Show hint (coming soon)

## Technical Details

### Algorithm

The game is based on a circular path-finding problem where you must minimize energy usage while avoiding hazards. The optimal solution involves dynamic programming to find the most efficient path.

### Development

```bash
# Run the game locally
open index.html

# Build for submission (creates cat_hop_cloud.zip)
./build.sh
```

### Size Optimization

- Minified variable names
- Inline styles and scripts
- No external dependencies
- Simple geometric shapes instead of images
- Final size: ~1.3KB zipped (well under 13KB limit)

## js13kGames Compliance

✓ Single index.html file that runs directly in browser  
✓ No external resources or libraries  
✓ Total size under 13,312 bytes when zipped  
✓ Full source code available on GitHub  

## License

MIT License - Created for js13kGames competition