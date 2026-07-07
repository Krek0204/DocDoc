//
//  DocumentsView.swift
//  DocDoc
//
//  Created by Сергей Мещеряков on 03.07.2026.
//

import Foundation
import SwiftUI

struct DocumentsView: View {
    
    @State var documents: [Document] = Document.mockDocuments
    @State private var search: String = ""
    
    var body: some View {
        VStack {
            VStack(alignment: .leading) {
                HStack {
                    Text("Документы")
                        .font(.largeTitle)
                        .bold()
                        .padding()
                    Spacer()
                    Button(
                        action: {
                            //
                        }, label: {
                            Image(systemName: "plus")
                                .foregroundStyle(Color.black)
                        }
                    )
                    .padding()
                }
                TextField("Поиск документов...", text: $search)
                    .padding()
                    .background(Color(.white))
                    .cornerRadius(10)
                    .overlay(
                        RoundedRectangle(cornerRadius: 10)
                            .stroke(Color(.stroke), lineWidth: 2)
                    )
                    .padding(.horizontal)
            }
            List {
                ForEach(documents, id: \.self) { document in
                    DocumentRowItem(document: document)
                        .listRowInsets(EdgeInsets())
                        .listRowSeparator(.hidden)
                        .listRowBackground(Color(.clear))

                }
            }
            .listStyle(.plain)
            .scrollContentBackground(.hidden)
        }
        .background(Color(.background))
    }
}


#Preview {
    DocumentsView()
}
