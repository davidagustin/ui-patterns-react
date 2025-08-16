import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ component: string }> }
) {
  try {
    const { component: componentName } = await params;

    // Map component names to their file paths
    const componentPaths: Record<string, string> = {
      'accordion-menu': 'app/patterns/accordion-menu/page.tsx',
      'adaptable-view': 'app/patterns/adaptable-view/page.tsx',
      'alternating-rows': 'app/patterns/alternating-rows/page.tsx',
      'archive': 'app/patterns/archive/page.tsx',
      'article-list': 'app/patterns/article-list/page.tsx',
      'autocomplete': 'app/patterns/autocomplete/page.tsx',
      'autosave': 'app/patterns/autosave/page.tsx',
      'bottom-navigation': 'app/patterns/bottom-navigation/page.tsx',
      'breadcrumbs': 'app/patterns/breadcrumbs/page.tsx',
      'calendar-picker': 'app/patterns/calendar-picker/page.tsx',
      'captcha': 'app/patterns/captcha/page.tsx',
      'cards': 'app/patterns/cards/page.tsx',
      'carousel': 'app/patterns/carousel/page.tsx',
      'categorization': 'app/patterns/categorization/page.tsx',
      'color-picker': 'app/patterns/color-picker/page.tsx',
      'completeness-meter': 'app/patterns/completeness-meter/page.tsx',
      'continuous-scrolling': 'app/patterns/continuous-scrolling/page.tsx',
      'copy-box': 'app/patterns/copy-box/page.tsx',
      'dashboard': 'app/patterns/dashboard/page.tsx',
      'data-filtering': 'app/patterns/data-filtering/page.tsx',
      'data-grid': 'app/patterns/data-grid/page.tsx',
      'data-visualization': 'app/patterns/data-visualization/page.tsx',
      'double-tap': 'app/patterns/double-tap/page.tsx',
      'drag-drop': 'app/patterns/drag-drop/page.tsx',
      'drag-reorder': 'app/patterns/drag-reorder/page.tsx',
      'dropdown-menu': 'app/patterns/dropdown-menu/page.tsx',
      'event-calendar': 'app/patterns/event-calendar/page.tsx',
      'expandable-input': 'app/patterns/expandable-input/page.tsx',
      'faq': 'app/patterns/faq/page.tsx',
      'fat-footer': 'app/patterns/fat-footer/page.tsx',
      'file-upload': 'app/patterns/file-upload/page.tsx',
      'fill-blanks': 'app/patterns/fill-blanks/page.tsx',
      'forgiving-format': 'app/patterns/forgiving-format/page.tsx',
      'formatting-data': 'app/patterns/formatting-data/page.tsx',
      'forms': 'app/patterns/forms/page.tsx',
      'gallery': 'app/patterns/gallery/page.tsx',
      'good-defaults': 'app/patterns/good-defaults/page.tsx',
      'home-link': 'app/patterns/home-link/page.tsx',
      'horizontal-dropdown': 'app/patterns/horizontal-dropdown/page.tsx',
      'image-gallery': 'app/patterns/image-gallery/page.tsx',
      'image-upload': 'app/patterns/image-upload/page.tsx',
      'image-zoom': 'app/patterns/image-zoom/page.tsx',
      'inplace-editor': 'app/patterns/inplace-editor/page.tsx',
      'input-feedback': 'app/patterns/input-feedback/page.tsx',
      'input-prompt': 'app/patterns/input-prompt/page.tsx',
      'inline-help': 'app/patterns/inline-help/page.tsx',
      'jumping-hierarchy': 'app/patterns/jumping-hierarchy/page.tsx',
      'keyboard-shortcuts': 'app/patterns/keyboard-shortcuts/page.tsx',
      'long-press': 'app/patterns/long-press/page.tsx',
      'menus': 'app/patterns/menus/page.tsx',
      'mobile-menu': 'app/patterns/mobile-menu/page.tsx',
      'modal': 'app/patterns/modal/page.tsx',
      'module-tabs': 'app/patterns/module-tabs/page.tsx',
      'morphing-controls': 'app/patterns/morphing-controls/page.tsx',
      'navbar': 'app/patterns/navbar/page.tsx',
      'navigation-tabs': 'app/patterns/navigation-tabs/page.tsx',
      'notifications': 'app/patterns/notifications/page.tsx',
      'pagination': 'app/patterns/pagination/page.tsx',
      'password-strength': 'app/patterns/password-strength/page.tsx',
      'pinch-zoom': 'app/patterns/pinch-zoom/page.tsx',
      'preview': 'app/patterns/preview/page.tsx',
      'progressive-disclosure': 'app/patterns/progressive-disclosure/page.tsx',
      'pull-refresh': 'app/patterns/pull-refresh/page.tsx',
      'radio-checkbox': 'app/patterns/radio-checkbox/page.tsx',
      'range-slider': 'app/patterns/range-slider/page.tsx',
      'rule-builder': 'app/patterns/rule-builder/page.tsx',
      'search': 'app/patterns/search/page.tsx',
      'search-filters': 'app/patterns/search-filters/page.tsx',
      'select-dropdown': 'app/patterns/select-dropdown/page.tsx',
      'settings': 'app/patterns/settings/page.tsx',
      'shortcut-dropdown': 'app/patterns/shortcut-dropdown/page.tsx',
      'sidebar': 'app/patterns/sidebar/page.tsx',
      'slideshow': 'app/patterns/slideshow/page.tsx',
      'sort-column': 'app/patterns/sort-column/page.tsx',
      'steps-left': 'app/patterns/steps-left/page.tsx',
      'structured-format': 'app/patterns/structured-format/page.tsx',
      'swipe-actions': 'app/patterns/swipe-actions/page.tsx',
      'swipe-navigation': 'app/patterns/swipe-navigation/page.tsx',
      'table-filter': 'app/patterns/table-filter/page.tsx',
      'tables': 'app/patterns/tables/page.tsx',
      'tabs': 'app/patterns/tabs/page.tsx',
      'tag-cloud': 'app/patterns/tag-cloud/page.tsx',
      'tagging': 'app/patterns/tagging/page.tsx',
      'tap-expand': 'app/patterns/tap-expand/page.tsx',
      'thumbnail': 'app/patterns/thumbnail/page.tsx',
      'undo': 'app/patterns/undo/page.tsx',
      'vertical-dropdown': 'app/patterns/vertical-dropdown/page.tsx',
      'wizard': 'app/patterns/wizard/page.tsx',
      'wysiwyg': 'app/patterns/wysiwyg/page.tsx',
    };

    const filePath = componentPaths[componentName];

    if (!filePath) {
      return NextResponse.json(
        { error: 'Component not found' },
        { status: 404 }
      );
    }

    // Check if we're in production (Vercel) and handle accordingly
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction) {
      // In production, return a fallback message since filesystem access is restricted
      return NextResponse.json(
        { 
          error: 'Source code not available in production',
          message: 'Please view the source code in development mode or check the GitHub repository',
          component: componentName
        },
        { status: 503 }
      );
    }

    // In development, try to read the file
    try {
      const fullPath = join(process.cwd(), filePath);
      
      // Check if file exists before reading
      if (!existsSync(fullPath)) {
        return NextResponse.json(
          { error: 'File not found', path: filePath },
          { status: 404 }
        );
      }
      
      const sourceCode = readFileSync(fullPath, 'utf-8');

      return new NextResponse(sourceCode, {
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'no-cache',
        },
      });
    } catch (fileError) {
      console.error('Error reading file:', fileError);
      return NextResponse.json(
        { error: 'Failed to read file', details: fileError instanceof Error ? fileError.message : 'Unknown error' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in source API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
