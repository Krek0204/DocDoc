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
        HStack(spacing: 6) {
            Image(systemName: "document")
                .padding(.leading, 16)
                .padding(16)
            
            VStack(alignment: .leading) {
                Text(document.title)
                    .lineLimit(1)
                    .font(Font.system(.title3).bold())
                    .padding(.top, 10)
                    
                Text("\(document.pagesCount) стр.")
                    //.monospaced()
                    .foregroundStyle(Color(.secondaryLabel))
                    .padding(.bottom, 10)
            }
            
            Spacer()
            
            Button(action: {}) {
                Image(systemName: "square.and.arrow.up")
                    .padding(.trailing, 16)
            }
        }
        .padding(.vertical, 8)
        .background(Color(.white))
        .clipShape(RoundedRectangle(cornerRadius: 10))
        .overlay(
            RoundedRectangle(cornerRadius: 10)
                .stroke(Color.stroke, lineWidth: 2)
        )
        .padding(.horizontal, 16)
        .padding(.vertical, 5)
    
    }
    
    init(document: Document) {
        self.document = document
    }
}

#Preview {
    DocumentRowItem(document: Document.mockDocument)
}
