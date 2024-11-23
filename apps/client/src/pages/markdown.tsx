"use client";

import MarkdownIt from "markdown-it";
import { useEffect, useRef } from "react";

interface MarkdownProps {
  source?: string;
}

function Markdown({ source }: MarkdownProps) {
  const mdRef = useRef<HTMLDivElement>(null);
  const md = MarkdownIt();
  // const result = md.render(source || "");
  const result = md.render(`
    # 코드 평가

## 전체적인 코드 구조

### 잘된 점

1. 타입스크립트 사용:
   - 모든 파일들이 타입스크립트를 사용하여 구현된 점은 고무적입니다. 타입스크립트는 타입 체크를 통해 런타임 오류를 줄여주며, 코드의 가독성 및 유지보수성을 높여줍니다.

2. MVC 패턴의 적용:
   - 전체 프로젝트가 MVC 패턴을 따라 구조화된 점이 우수합니다. 이는 코드의 역할을 명확히 구분하고, 구조적인 접근 방식을 통해 장기적으로 유지 보수에 용이합니다.

3. 파일 구조:
   - 디렉토리가 /app/src/project/src/routes, /app/src/project/src/models, /app/src/project/src/services 등으로 분리되어 있어 모듈화와 코드 명확성을 높이며, 서비스별 책임을 분리한 점이 인상적입니다.

### 개선이 필요한 점

1. 디렉토리 네이밍:
   - loaders와 splitters가 DataIngestion 내부에 있지만, 각각의 기능을 좀 더 세분화해서 ingestion-loaders와 ingestion-splitters 같은 구체적인 이름으로 디렉토리를 구분하면 명확성을 더할 수 있습니다.

2. 코드 중복 제거:
   - 비슷한 코드들이 여러 서비스에 중복되어 있을 가능성이 높습니다. PDF, DOCX 파일 로더에서 공통적으로 처리하는 부분은 별도로 추출하여 재사용하면 유지보수성을 높일 수 있습니다.

## 세부 사항 분석

### 잘된 점

1. 데이터 로더 구현:
   - 다양한 파일 형식을 지원하는 로더(pdf-loader.ts, docx-loader.ts, notion-loader.ts, web-loader.ts)가 잘 구현되어

  `);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (mdRef.current) {
      mdRef.current.innerHTML = result;
    }
  }, [source]);
  return <div ref={mdRef} className="markdown" />;
}

export default Markdown;
