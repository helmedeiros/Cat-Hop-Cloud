#!/bin/bash

# Build script for Cat Hop Cloud - js13kGames entry
# This script minifies and compresses the game to under 13KB

echo "Building Cat Hop Cloud for js13kGames..."

# Create build directory
mkdir -p build

# Extract JavaScript from index.html
echo "Extracting JavaScript..."
sed -n '/<script>/,/<\/script>/p' index.html | sed '1d;$d' > build/game.js

# Create minified version with inline optimizations
echo "Creating optimized version..."
cat > build/index_min.html << 'EOF'
<!DOCTYPE html><html><head><meta charset="utf-8"><title>Cat Hop Cloud</title><style>body{margin:0;padding:0;background:#87CEEB;overflow:hidden;font-family:monospace}canvas{display:block;margin:0 auto}#info{position:absolute;top:10px;left:10px;color:#fff;font-size:18px;text-shadow:2px 2px 4px rgba(0,0,0,.5)}</style></head><body><div id="info">Luck: <span id="e">100</span></div><canvas id="c"></canvas><script>
const c=document.getElementById('c'),x=c.getContext('2d'),e=document.getElementById('e');c.width=800;c.height=600;
let s={e:100,p:0,c:[0,0,1,0,1,1,0,0],n:8,o:0,w:0};
function P(i){const a=i*Math.PI*2/s.n-Math.PI/2,r=200,X=400,Y=300;return{x:X+r*Math.cos(a),y:Y+r*Math.sin(a)}}
function C(X,Y,t,n){x.save();x.fillStyle=t?'#F44':'#C8F';x.beginPath();x.arc(X-20,Y,20,0,Math.PI*2);x.arc(X+20,Y,20,0,Math.PI*2);x.arc(X,Y-10,25,0,Math.PI*2);x.fill();x.fillStyle='#000';x.font='bold 24px monospace';x.textAlign='center';x.textBaseline='middle';x.fillText(n,X,Y);if(t){x.strokeStyle='#FF0';x.lineWidth=3;x.beginPath();x.moveTo(X,Y+25);x.lineTo(X-5,Y+35);x.lineTo(X+5,Y+35);x.lineTo(X,Y+45);x.stroke()}x.restore()}
function K(X,Y){x.save();x.fillStyle='#000';x.fillRect(X-10,Y-10,20,15);x.beginPath();x.arc(X,Y-15,8,0,Math.PI*2);x.fill();x.beginPath();x.moveTo(X-8,Y-18);x.lineTo(X-5,Y-25);x.lineTo(X-2,Y-18);x.moveTo(X+2,Y-18);x.lineTo(X+5,Y-25);x.lineTo(X+8,Y-18);x.fill();x.beginPath();x.moveTo(X+10,Y);x.quadraticCurveTo(X+20,Y-10,X+15,Y-20);x.lineWidth=3;x.stroke();x.restore()}
function j(k){if(s.o||s.w)return;if(s.e>=k){s.e-=k;s.p=(s.p+k)%s.n;if(s.c[s.p])s.e-=2;e.textContent=s.e;if(s.p===0&&s.e>0)s.w=1;else if(s.e<=0)s.o=1;D()}}
document.onkeydown=k=>{const v=k.key;if(v>='1'&&v<='9')j(+v);if(v=='r'){s.e=100;s.p=0;s.o=0;s.w=0;e.textContent=s.e;D()}};
function D(){x.fillStyle='#87CEEB';x.fillRect(0,0,800,600);for(let i=0;i<s.n;i++){const p=P(i);C(p.x,p.y,s.c[i],i)}const p=P(s.p);K(p.x,p.y);if(s.w){x.fillStyle='#0F0';x.font='bold 48px monospace';x.textAlign='center';x.fillText('You Win!',400,300);x.font='24px monospace';x.fillText('Final Luck: '+s.e,400,340)}else if(s.o){x.fillStyle='#F00';x.font='bold 48px monospace';x.textAlign='center';x.fillText('Game Over!',400,300);x.font='24px monospace';x.fillText('Out of luck!',400,340)}x.fillStyle='#000';x.font='14px monospace';x.textAlign='left';x.fillText('Press 1-9 to jump clouds | R to reset',10,590)}
D();
</script></body></html>
EOF

# Create zip file
echo "Creating zip file..."
cd build
zip -9 game.zip index_min.html

# Rename for submission
mv index_min.html index.html
zip -9 ../cat_hop_cloud.zip index.html

# Check final size
cd ..
SIZE=$(ls -l cat_hop_cloud.zip | awk '{print $5}')
echo "Final ZIP size: $SIZE bytes"

if [ $SIZE -le 13312 ]; then
    echo "✓ Success! Game is under 13KB limit (13,312 bytes)"
else
    echo "✗ Warning! Game exceeds 13KB limit!"
fi

# Clean up
rm -rf build