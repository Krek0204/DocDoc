//
//  LatestDocsView.swift
//  DocDoc
//
//  Created by Сергей Мещеряков on 03.07.2026.
//

import Foundation
import SwiftUI

struct LatestDocsView: View {
    let documents: [Document]

    var body: some View {
        List(documents, id: \.self) { document in
            DocumentRowItem(document: document)
                .listRowBackground(Color.clear)
                .listRowInsets(EdgeInsets())
                .listRowSeparator(.hidden)
        }

        .scrollContentBackground(.hidden)
        .listStyle(.plain)
        .listRowSeparator(.hidden)
    }
}

#Preview {
    LatestDocsView(documents: Document.mockDocuments)
}
