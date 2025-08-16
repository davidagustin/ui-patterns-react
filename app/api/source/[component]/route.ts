import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { component: string } }
) {
  try {
    const componentName = params.component;
    
    // Map component names to their file paths
    const componentPaths: Record<string, string> = {
      'image-zoom': 'app/patterns/image-zoom/page.tsx',
      'accordion-menu': 'app/patterns/accordion-menu/page.tsx',
      'adaptable-view': 'app/patterns/adaptable-view/page.tsx',
      'autocomplete': 'app/patterns/autocomplete/page.tsx',
      'breadcrumbs': 'app/patterns/breadcrumbs/page.tsx',
      'carousel': 'app/patterns/carousel/page.tsx',
      'categorization': 'app/patterns/categorization/page.tsx',
      'data-grid': 'app/patterns/data-grid/page.tsx',
      'dropdown-menu': 'app/patterns/dropdown-menu/page.tsx',
      'forms': 'app/patterns/forms/page.tsx',
      'modal': 'app/patterns/modal/page.tsx',
      'pagination': 'app/patterns/pagination/page.tsx',
      'search': 'app/patterns/search/page.tsx',
      'tabs': 'app/patterns/tabs/page.tsx',
      'tables': 'app/patterns/tables/page.tsx',
      // Add more components as needed
    };

    const filePath = componentPaths[componentName];
    
    if (!filePath) {
      return NextResponse.json(
        { error: 'Component not found' },
        { status: 404 }
      );
    }

    // Read the actual source file
    const fullPath = join(process.cwd(), filePath);
    const sourceCode = readFileSync(fullPath, 'utf-8');

    return new NextResponse(sourceCode, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error reading source code:', error);
    return NextResponse.json(
      { error: 'Failed to load source code' },
      { status: 500 }
    );
  }
}
