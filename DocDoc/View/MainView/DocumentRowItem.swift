//
//  DocumentRowItem.swift
//  DocDoc
//
//  Created by Сергей Мещеряков on 03.07.2026.
//

import Foundation
import SwiftUI

struct DocumentRowItem: View {
    
    let document: Document
    
    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: "document")
                .padding()
            VStack(alignment: .leading) {
                Text(document.title)
                    .lineLimit(1)
                    .font(Font.system(.title3).bold())
                    
                Text("\(document.pagesCount) стр.")
                    .monospaced()
                    .foregroundStyle(Color(.secondaryLabel))
            }
            Spacer()
            Button(action: {}) {
                Image(systemName: "square.and.arrow.up")
                
            }
            
            
        }
        .padding()
        .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color.gray.opacity(0.3), lineWidth: 2))
        .padding()
        
    }
    
    init(document: Document) {
        self.document = document
    }
}

#Preview {
    DocumentRowItem(document: Document.mockDocument)
}
