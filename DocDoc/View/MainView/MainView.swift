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
                            Text("Добрый день!")
                                // .monospaced(true)
                                .foregroundStyle(Color.gray)
                            Text("Главная")
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
                        .clipShape(RoundedRectangle(cornerRadius: 16))
                        .frame(maxWidth: .infinity, maxHeight: 160)
                        .padding(.horizontal, 5)
                        .padding(.vertical, 5)
                        .shadow(radius: 5)
                        .overlay {
                            VStack {
                                ZStack {
                                    Circle()
                                        .frame(maxWidth: 50, maxHeight: 50)
                                        .foregroundStyle(Color.white.opacity(0.2))
                                    Image(systemName: "folder")
                                        .foregroundStyle(Color(.white))
                                }
                                Text("Сканировать")
                                    .font(.title)
                                    .foregroundStyle(Color(.white))
                                    .bold()
                            }
                            .onTapGesture {
                                // Переход на сканер
                            }
                        }

                    HStack {
                        Rectangle()
                            .frame(maxWidth: .infinity, maxHeight: 100)
                            .foregroundStyle(Color.white)
                            .overlay(RoundedRectangle(cornerRadius: 16).stroke(Color(.stroke)))
                            .clipShape(RoundedRectangle(cornerRadius: 16))
                            .shadow(radius: 2)
                            .overlay {
                                VStack {
                                    Image(systemName: "folder")
                                    Text("Документы")
                                        .bold()
                                }
                                .onTapGesture {
                                    // Переход на экран документов
                                }
                            }
                        Rectangle()
                            .frame(maxWidth: .infinity, maxHeight: 100)
                            .foregroundStyle(Color.white)
                            .overlay(RoundedRectangle(cornerRadius: 16).stroke(Color(.stroke)))
                            .clipShape(RoundedRectangle(cornerRadius: 16))
                            .shadow(radius: 2)
                            .overlay {
                                VStack {
                                    Image(systemName: "photo.stack")
                                    Text("Галерея")
                                        .bold()
                                }
                                .onTapGesture {
                                    // Переход на экран галереи
                                }
                            }
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
