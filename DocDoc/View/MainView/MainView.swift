//
//  MainView.swift
//  DocDoc
//
//  Created by Сергей Мещеряков on 03.07.2026.
//

import SwiftUI

struct MainView: View {
    @State private var documents: [Document] = Document.mockDocuments
    var body: some View {
        VStack {
            VStack {
                VStack(alignment: .leading) {
                    HStack {
                        VStack(alignment: .leading) {
                            Text("Hi there")
                                .monospaced(true)
                                .foregroundStyle(Color.gray)
                            Text("DocDoc")
                                .font(Font.system(.largeTitle))
                                .bold()
                        }
                        Spacer()
                        Button(action: {}) {
                            Image(systemName: "gearshape")
                                .foregroundStyle(Color.black)
                                .padding()
                        }
                    }
                    Rectangle()
                        .foregroundStyle(Color.blue)
                        .frame(width: 340, height: 150)
                        .clipShape(RoundedRectangle(cornerRadius: 16))
                    HStack {
                        Rectangle()
                            .frame(width: 165, height: 120)
                            .clipShape(RoundedRectangle(cornerRadius: 16))
                            .foregroundStyle(Color.gray)
                        Rectangle()
                            .frame(width: 165, height: 120)
                            .clipShape(RoundedRectangle(cornerRadius: 16))
                            .foregroundStyle(Color.gray)
                    }

                    HStack {
                        Text("Недавние")
                            .font(.title2)
                            .bold()
                            .padding()
                        Spacer()
                        Button {
                            //
                        } label: {
                            Text("Все")
                        }
                        .padding()
                    }

                    VStack {
                        List {
                            ForEach(documents.suffix(3), id: \.self) { document in
                                DocumentRowItem(document: document)
                                    .listRowInsets(EdgeInsets())
                                    .listRowSeparator(.hidden)
                                    .listRowBackground(Color(.clear))
                            }
                        }
                        .scrollContentBackground(.hidden)
                        .listStyle(.plain)
                        .listRowSeparator(.hidden)
                        .scrollDisabled(true)

                        // .frame(height: 150)
                    }
                }
            }

            .padding()
        }
        .background(Color(.background))
    }
}

#Preview {
    MainView()
}
