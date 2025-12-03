// src/devTools/extractCollections.js
import fs from 'fs'
import path from 'path'

/*@usage
EXTRACTS ALL GROUPS starting with "COLLECTION_" from Scene_Hangar.jsx
    • node src/devtools/extractCollections.js [SceneFolder]
    • node src/devtools/extractCollections.js HangarScene

EXTRACTS and REWRITES only the SPECIFIC collection(s)
    • node src / devtools / extractCollections.js[SceneFolder] [COLLECTION_Name] [COLLECTION_Name]
    • node src/devtools/extractCollections.js HangarScene COLLECTION_PushTractor COLLECTION_SafetyCones

WRITES all extracted components TO A TEMPORARY OUTPUT folder for review
    • node src/devtools/extractCollections.js [SceneFolder] 
    • node src/devtools/extractCollections.js HangarScene 

USAGE VIA NPM SCRIPT:
    • npm run extractCollections [SceneFolder] [COLLECTION_Name] [COLLECTION_Name] 
    • node src/devTools/extractCollections.js HangarScene COLLECTION_PushTractor COLLECTION_SafetyCones
    
*/

/* 
  ===============================
  CONFIGURATION
  ===============================
*/

// Root folder for scenes - change this for other projects if needed
const ROOT_SCENES_PATH = path.resolve('./src/scenes')
// Example for alternate project structure:
// const ROOT_SCENES_PATH = path.resolve('./app/projects/3dScenes')

/* 
  ===============================
  ARG PARSING
  ===============================
*/
const args = process.argv.slice(2)
if (args.length < 1) {
    console.error('Usage: node extractCollections.js <SceneFolder or SceneFile.jsx> [COLLECTION_name ...]')
    process.exit(1)
}

const sourceArg = args[0]
const explicitCollections = args.slice(1).filter(a => a.startsWith('COLLECTION_'))

/* 
  ===============================
  DETERMINE SOURCE
  ===============================
*/
let sceneDir = ''
let sourceFile = ''
let sourcePath = ''

const stat = fs.existsSync(sourceArg) ? fs.statSync(sourceArg) : null
if (stat?.isFile() && sourceArg.endsWith('.jsx')) {
    sourcePath = path.resolve(sourceArg)
    sceneDir = path.dirname(sourcePath)
    sourceFile = path.basename(sourcePath)
} else if (stat?.isDirectory() || !stat) {
    sceneDir = path.resolve(ROOT_SCENES_PATH, sourceArg)
    if (!fs.existsSync(sceneDir)) {
        console.error(`❌ Scene folder not found: ${sceneDir}`)
        process.exit(1)
    }
    sourceFile = fs.readdirSync(sceneDir).find(f => f.startsWith('Scene_') && f.endsWith('.jsx'))
    if (!sourceFile) {
        console.error(`❌ No Scene_*.jsx file found in ${sceneDir}`)
        process.exit(1)
    }
    sourcePath = path.join(sceneDir, sourceFile)
} else {
    console.error('❌ Invalid source argument')
    process.exit(1)
}

/* 
  ===============================
  OUTPUT FOLDER
  ===============================
*/
const componentsDir = path.join(sceneDir, 'components', 'extracted')
if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true })
console.log(`📂 Collections will be written to: ${componentsDir}`)

/* 
  ===============================
  DYNAMIC GLB PATH
  ===============================
*/
const glbFileName = sourceFile.replace('.jsx', '') + '.glb'
const glbPath = `/models/${glbFileName}`
console.log(`🎬 GLB source: ${glbPath}`)

/* 
  ===============================
  READ SCENE FILE
  ===============================
*/
const fileContent = fs.readFileSync(sourcePath, 'utf-8')

/* 
  ===============================
  MATCH COLLECTIONS
  ===============================
*/
const groupRegex = /<group name=['"](COLLECTION_[^'"]+)['"][\s\S]*?<\/group>/g
const matches = [...fileContent.matchAll(groupRegex)]

if (matches.length === 0) {
    console.log('⚠️ No COLLECTION_* groups found.')
    process.exit(0)
}

const groupsToWrite = explicitCollections.length
    ? matches.filter(m => explicitCollections.includes(m[1]))
    : matches

/* 
  ===============================
  WRITE EACH COLLECTION
  ===============================
*/
for (const match of groupsToWrite) {
    const name = match[1]
    const jsx = match[0]
    const componentName = name.replace(/^COLLECTION_/, '')
    const fileOut = path.join(componentsDir, `${componentName}.jsx`)

    const boilerplate = `
import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function ${componentName}({ nodes, materials, actions, ...props }) {
  if (!nodes || !materials) {
    console.warn('[${componentName}] nodes or materials not provided')
    return null
  }

  return (
    <group {...props}>
${jsx}
    </group>
  )
}

useGLTF.preload('${glbPath}')
`.trim()

    fs.writeFileSync(fileOut, boilerplate)
    console.log(`✅ Wrote ${componentName}.jsx`)
}