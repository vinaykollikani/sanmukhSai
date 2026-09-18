import os
import re

sections_dir = "src/components/sections"
files = [f for f in os.listdir(sections_dir) if f.endswith(".tsx")]

for file in files:
    path = os.path.join(sections_dir, file)
    with open(path, "r") as f:
        content = f.read()

    # Remove the standard mm.add block
    pattern = r'[ \t]*const mm = gsap\.matchMedia\(\);\s*mm\.add\("\(prefers-reduced-motion: no-preference\)", \(\) => \{.*?(?=\n[ \t]*(?:const prefersReducedMotion|// We only|const isDesktop|return \(\)))'
    
    # We need a more robust regex or just string manipulation because the block ends before `const prefersReducedMotion` or `// We only`
    # Let's use a regex that matches `const mm = gsap.matchMedia();` until `});` that is at the same indentation level.
    
    # Actually, simpler: 
    # find `const mm = gsap.matchMedia();`
    # and remove until `});` (inclusive) that closes it.
    
    # Let's do it manually
    lines = content.split("\n")
    new_lines = []
    skip = False
    brace_count = 0
    
    for line in lines:
        if "const mm = gsap.matchMedia();" in line:
            skip = True
            continue
            
        if skip:
            brace_count += line.count("{")
            brace_count -= line.count("}")
            if brace_count <= 0 and "});" in line:
                skip = False
            continue
            
        new_lines.append(line)
        
    content = "\n".join(new_lines)
    
    # For Skills.tsx, remove the yPercent logic
    if file == "Skills.tsx":
        content = re.sub(r'const prefersReducedMotion = window\.matchMedia\("\(prefers-reduced-motion: reduce\)"\)\.matches;\s*', '', content)
        content = re.sub(r'yPercent: prefersReducedMotion \? 0 : \(p \* 10 - 5\)', 'yPercent: 0', content)
        content = re.sub(r'yPercent: prefersReducedMotion \? 0 : \(p \* 25 - 10\)', 'yPercent: 0', content)
        
    # For SocialSection.tsx it might have a different structure, let's check it.
    
    with open(path, "w") as f:
        f.write(content)

print("Done")
