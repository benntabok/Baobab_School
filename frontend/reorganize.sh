# 1. Move the 'good' nested structure up to the main src folder
# This populates src/features, src/layouts, src/hooks, etc.
mv src/src/* src/

# 2. Delete the now-empty nested src/src
rm -rf src/src

# 3. Handle the stray folders in the Root (the 'old' versions)
# We move them into the new src folders to ensure everything is consolidated
[ -d Components ] && mv Components/* src/components/shared/ && rm -rf Components
[ -d Pages ] && mv Pages/* src/pages/ && rm -rf Pages
[ -d Data ] && mv Data src/data
[ -d Store ] && mv Store src/store
[ -d utils ] && mv utils/* src/utils/ && rm -rf utils
[ -d content ] && mv content src/content

# 4. Move the stray React entry files into src
[ -f App.jsx ] && mv App.jsx src/
[ -f App.css ] && mv App.css src/
[ -f index.css ] && mv index.css src/
[ -f main.jsx ] && mv main.jsx src/

echo "🌳 Baobab Consolidated! Structure is now unified."